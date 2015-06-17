---
layout: post
title:  "Rails route"
keywords: "rails route"
description: "rails route"
category: rails
tags: [REST]
---

If you have the following in your `routes.rb` file, then `Rails` provides the following restful routes for you:

```ruby
resources :blogs
```

HTTP Verb|REST URI       |Controller#Action|Helper
----     |----           |----             |----
GET      |/blogs         |blogs#index      |blogs_path
GET      |/blogs/new     |blogs#new        |new\_blog_path
POST     |/blogs         |blogs#create     |blogs_path
GET      |/blogs/:id     |blogs#show       |blog_path(:id)
GET      |/blogs/:id/edit|blogs#edit       |edit\_blog_path(:id)
PUT      |/blogs/:id     |blogs#update     |blog_path(:id)
DELETE   |/blogs/:id     |blogs#destroy    |blog_path(:id)

And resources routes with a scope:

```ruby
scope :path => 'mine' do
  resources :blogs
end
```

HTTP Verb|REST URI            |Controller#Action|Helper
----     |----                |----             |----
GET      |/mine/blogs         |blogs#index      |blogs_path
GET      |/mine/blogs/new     |blogs#new        |new\_blog_path
POST     |/mine/blogs         |blogs#create     |blogs_path
GET      |/mine/blogs/:id     |blogs#show       |blog_path(:id)
GET      |/mine/blogs/:id/edit|blogs#edit       |edit\_blog_path(:id)
PUT      |/mine/blogs/:id     |blogs#update     |blog_path(:id)
DELETE   |/mine/blogs/:id     |blogs#destroy    |blog_path(:id)

```ruby
scope :moudle => 'mine' do
  resources :blogs
end
```

HTTP Verb|REST URI       |Controller#Action |Helper
----     |----           |----              |----
GET      |/blogs         |mine/blogs#index  |blogs_path
GET      |/blogs/new     |mine/blogs#new    |new\_blog_path
POST     |/blogs         |mine/blogs#create |blogs_path
GET      |/blogs/:id     |mine/blogs#show   |blog_path(:id)
GET      |/blogs/:id/edit|mine/blogs#edit   |edit\_blog_path(:id)
PUT      |/blogs/:id     |mine/blogs#update |blog_path(:id)
DELETE   |/blogs/:id     |mine/blogs#destroy|blog_path(:id)

```ruby
scope :as => 'mine' do
  resources :blogs
end
```

HTTP Verb|REST URI       |Controller#Action|Helper
----     |----           |----             |----
GET      |/blogs         |blogs#index      |mine\_blogs_path
GET      |/blogs/new     |blogs#new        |new\_mine\_blog_path
POST     |/blogs         |blogs#create     |mine\_blogs_path
GET      |/blogs/:id     |blogs#show       |mine\_blog_path(:id)
GET      |/blogs/:id/edit|blogs#edit       |edit\_mine\_blog_path(:id)
PUT      |/blogs/:id     |blogs#update     |mine\_blog_path(:id)
DELETE   |/blogs/:id     |blogs#destroy    |mine\_blog_path(:id)

And resources routes with a namespace:

```ruby
namespace :mine do
  resources :blogs
end
```

HTTP Verb|REST URI            |Controller#Action |Helper
----     |----                |----              |----
GET      |/mine/blogs         |mine/blogs#index  |mine\_blogs_path
GET      |/mine/blogs/new     |mine/blogs#new    |new\_mine\_blog_path
POST     |/mine/blogs         |mine/blogs#create |mine\_blogs_path
GET      |/mine/blogs/:id     |mine/blogs#show   |mine\_blog_path(:id)
GET      |/mine/blogs/:id/edit|mine/blogs#edit   |edit\_mine\_blog_path(:id)
PUT      |/mine/blogs/:id     |mine/blogs#update |mine\_blog_path(:id)
DELETE   |/mine/blogs/:id     |mine/blogs#destroy|mine\_blog_path(:id)

You may find that <span class="warning">the namespace scope will automatically add :path, :module and :as prefix.</span>

So

```ruby
namespace :mine do
  resources :blogs
end
```

is the same as 

```ruby
scope :path => 'mine', :moudle => 'mine', :as => 'mine' do
  resources :blogs
end
```



