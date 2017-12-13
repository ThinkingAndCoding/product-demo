## 配置

新建配置文件.env设置postgre用户名,密码,服务port

```
DB_USER=******
DB_PASSWORD=******
PORT=8889
```

执行初始化postgresql

```
CREATE TABLE "public"."product" (
  "id" int8 NOT NULL DEFAULT nextval('product_id_seq'::regclass),
  "name" char(10) COLLATE "pg_catalog"."default" NOT NULL,
  "description" char(255) COLLATE "pg_catalog"."default",
  "price" int8 NOT NULL,
  CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
```

## 安装

```
git clone https://github.com/ThinkingAndCoding/product-demo.git

npm install

npm run build

npm run server
```

## 访问

localhost:8889





