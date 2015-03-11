---
layout: post
title:  "Ruby的Tcp Socket通讯"
keywords: "tcpsocket"
description: "Ruby中的TcpServer和TcpClient"
category: ruby
tags: [tcpsocket]
---

之前在做Gps追踪系统时，我曾经做过一个基于ruby的Tcp Socket通讯实例。这个Tcp通讯采用"发-收"的模式，即客户端首先要发送一个验证数据包，服务器端收到后验证数据格式，验证通过则回复数据包。

客户端的实现如下：

```ruby
# encoding: utf-8
require 'socket'

class TcpClient

  # uri = "localhost:4000"
  def initialize(url)
    @server, @port = url.split(":")
  end

  def start
    begin
      @socket = TCPSocket.new(@server, @port)
    rescue Errno::ECONNREFUSED #server停止
      logger.info "error connect with #{@server}:#{@port}"
      sleep 5
      retry
    end
  end

  # 如果直接判断closed?可能会抛异常
  def alive?
    begin
      !@socket.closed?
    rescue
      false
    end
  end

  # 发送连接请求
  def connect
    start
    @socket.write_nonblock pack
  end

  # 重发连接请求
  def re_connect
    @socket.close  if self.alive?
    connect
  end

  def fetch
    connect

    begin
      # 非阻塞读1024字节
      while ret = @socket.recv_nonblock(1024)
        unless ret.empty?
          data_arr = unpack(ret)
          data_arr.each do |data|
            #这是解包后的数据体
            puts data
          end
        end
      end
    rescue Errno::EAGAIN
      # IO.select will block until the socket is readable or the timeout
      IO.select [@socket]
      retry
    rescue Errno::ECONNRESET, Errno::EPIPE
      # server端主动关闭client连接
      logger.info "Connection reset by peer"
      sleep 5
      re_connect
      retry
    end
  end

  private
  # server端要求的（发送的）数据包格式：[起始标志、数据长度、命令字、数据体、结束标记]
  # 起始标志： Hex(2字节); "ABA5"
  # 数据长度： Hex(2字节); 等于命令字长度 + 数据体长度 + 结束标记长度
  # 命令字： Hex(2字节); 请求:"0001",回复:"0002"
  # 数据体： String(不限)
  # 结束标志： Hex(1字节); "DC"

  # 封包（验证包）
  def pack
    # "User,Password;admin,123456;".bytesize = 27;
    # 数据长度 = 命令字(2) + 数据体(27) + 结束标识(1) = 30;
    # 30.to_s(16).rjust(4, '0') = "001E"  ==> 十六进制2位字符为1个字节,左补2个0;
    ["ABA5", "001E", "0001", "User,Password;admin,123456;", "DC"].pack('H*H*H*A*H*')
    # 输出： "\xAB\xA5\x00\x1E\x00\x01User,Password;admin,123456;\xDC"
  end

  # 拆包
  def unpack(chunk)
    ret = []
    arr = chunk.chomp.split(parse("\xDC"))
    arr.each do |s|
      if s.start_with?(parse("\xAB\xA5"))
        # 去除起始标识
        s.slice!(0..1)
        # 拆数据包 => [数据长度、命令字、数据体]
        data = s.unpack("H4H4A*")
        if data[1] == "0002"
          ret << data[2]
        end
      end
    end
    ret
  end

  # 转换utf-8 => ascii
  def parse(str)
    str.force_encoding('ascii-8bit')
  end
end

TcpClient.new('localhost:4000').fetch
```

简单的服务器端模拟：

```ruby
# encoding: utf-8
require 'socket'
require "rufus-scheduler"

server = TCPServer.new 4004

while true do
  client = server.accept

  # server端验证数据略
  
  # 定时器每隔一秒发一次Gps
  Rufus::Scheduler.new.every '1s' do

    # 虚拟的Gps数据
    record = ['62652', 121.516918, 36.915564]
    id = record[0]
    longitude = record[1]
    latitude = record[2]
    speed = rand(40..50)
    arrow = rand(360)
    time = Time.now.strftime("%Y-%m-%d %H:%M:%S")
    gps = "carlicense,drivername,gpslng,gpslat,altitude,speed,direction,voltage,terminaltemperature,enginetemperature,carriagetemperature,passengers,location,objectarg,gpstime,time,gpsstatus,iostate,remark;#{id},,#{longitude},#{latitude},,#{speed},#{arrow},0.00,39.00,0.00,-128.00,0,,,#{time},2013-06-25 17:01-19,A,00000000.8000,;"
    gps_size = (gps.bytesize + 3).to_s(16).rjust(4, '0')

    # server端回复数据
    client.puts ["ABA5","#{gps_size}", "0002", "#{gps}", "DC"].pack('H*H*H*A*H*')*3
    
    # server端主动关闭client连接
    # client.close
  end
end

```

