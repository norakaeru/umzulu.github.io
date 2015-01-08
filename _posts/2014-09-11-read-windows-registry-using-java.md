---
layout: post
title:  "java读注册表"
keywords: "java读注册表"
description: "用java读注册表，不依赖第三方类库"
category: java
tags: [注册表]
---

java读注册表一般是通过第三方类库`jRegistry`来实现的，而[ Java Query Windows registry ](http://stonybrook.iteye.com/blog/1150823) 使用了一种更简便的方法，通过`Runtime.getRuntime().exec(cmd)`来调用`cmd`命令实现。


```java
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;

public class WindowsReqistry {
   /**
     * @param location path in the registry
     * @param key registry key
     * @return registry value or null if not found
     */
    public static final String readRegistry(String location, String key){
        try {
            // Run reg query, then read output with StreamReader (internal class)
            Process process = Runtime.getRuntime().exec("reg query " + '"'+ location + "\" /v \"" + key + "\"");

            StreamReader reader = new StreamReader(process.getInputStream());
            reader.start();
            process.waitFor();
            reader.join();
            String output = reader.getResult();
            output = output.trim();
            // Output has the following format:
            // \n<Version information>\n\n<key>\t<registry type>\t<value> OR
            // \n<Version information>\n\n<key>   <registry type>    <value> 
            if( output.contains("\t")){
                String[] parsed = output.split("\t");
                return parsed[parsed.length-1];
            }else if( output.contains(" ")){
            	String[] parsed = output.split(" ");
                return parsed[parsed.length-1];
            }else{
            	return null;
            }
        }
        catch (Exception e) {
            return null;
        }

    }

    static class StreamReader extends Thread {
        private InputStream is;
        private StringWriter sw= new StringWriter();

        public StreamReader(InputStream is) {
            this.is = is;
        }

        public void run() {
            try {
                int c;
                while ((c = is.read()) != -1)
                    sw.write(c);
            }
            catch (IOException e) { 
            }
        }

        public String getResult() {
            return sw.toString();
        }
    }
    
//    public static void main(String[] args) {
//        String value = WindowsReqistry.readRegistry("HKEY_LOCAL_MACHINE\\SOFTWARE\\BYHT", "WIN_CODE");
//        System.out.println(value);
//    }

}
```

在实际应用中，把注册表项写在了`HKEY_LOCAL_MACHINE\SOFTWARE`目录下，能正常取到值。

后来在偶然情况下，发现在64位系统下测试不通过，原来`HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node`是32位程序读64位注册表的默认路径，jdk32读windows64时需要特别注意。
