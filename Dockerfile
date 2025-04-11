# Giai đoạn build
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file package
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Mở port (port mặc định của vite)
EXPOSE 5173

# Khởi động ứng dụng
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]