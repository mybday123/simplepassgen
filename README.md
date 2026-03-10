# Simple Password Generator

**SimplePassGen** adalah aplikasi web sederhana untuk menghasilkan password secara acak (random password generator).

Project ini dibuat sebagai bagian dari tugas **GSLC DevOps**.

---

## Cara Install Project

Clone repository dari GitHub:

```t
git clone https://github.com/mybday123/simplepassgen.git
```

Masuk ke folder project:

```t
cd simplepassgen
```

Install dependencies:

```t
npm install
```

---

## Menjalankan Project (Development)

Untuk menjalankan project dalam mode development:

```t
npm run dev
```

Buka browser dan akses:

```t
http://localhost:5173
```

---

## Build Project

Untuk membuat versi production:

```
npm run build
```

Hasil build akan berada di folder:

```
dist/
```

---

# Menjalankan Project Menggunakan Docker

Project ini menggunakan **multi-stage Docker build** untuk:

1. Build aplikasi menggunakan Node.js
2. Menjalankan hasil build menggunakan Nginx

### Build Docker Image

```
docker build -t simplepassgen .
```

### Menjalankan Container

```
docker run -p 8000:80 simplepassgen
```

Setelah container berjalan, buka browser:

```
http://localhost:8000
```

---

# Workflow Docker

Proses deployment menggunakan Docker:

```
Source Code
   ↓
Docker Build
   ↓
Docker Image
   ↓
Docker Container
   ↓
Website Running
```

---

# Collaboration

Project ini menggunakan sistem kolaborasi **GitHub** dengan workflow:

1. Fork atau clone repository
2. Membuat branch baru
3. Melakukan perubahan kode
4. Mengirim Pull Request

---

# Author

Kelompok GSLC

