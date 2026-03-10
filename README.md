# Simple Password Generator

**SimplePassGen** adalah aplikasi web sederhana untuk menghasilkan password secara acak (random password generator).

Project ini dibuat sebagai bagian dari tugas **GSLC DevOps**.

---

## Cara Install Project

Clone repository dari GitHub:

```text
git clone https://github.com/mybday123/simplepassgen.git
```

Masuk ke folder project:

```text
cd simplepassgen
```

Install dependencies:

```text
npm install
```

---

## Menjalankan Project (Development)

Untuk menjalankan project dalam mode development:

```text
npm run dev
```

Buka browser dan akses:

```text
http://localhost:5173
```

---

## Build Project

Untuk membuat versi production:

```text
npm run build
```

Hasil build akan berada di folder:

```text
dist/
```

---

## Menjalankan Project Menggunakan Docker

Project ini menggunakan **multi-stage Docker build** untuk:

1. Build aplikasi menggunakan Node.js
2. Menjalankan hasil build menggunakan Nginx

### Build Docker Image

```text
docker build -t simplepassgen .
```

### Menjalankan Container

```text
docker run -p 8000:80 simplepassgen
```

Setelah container berjalan, buka browser:

```text
http://localhost:8000
```

---

## Author

Kelompok GSLC
