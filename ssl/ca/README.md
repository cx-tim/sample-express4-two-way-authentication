### `server.key` and `server.pem`

They are the signer for the server certificates.



### `demo.key` and `demo.pem`

They could be used to sign certificates for your clients.



### How-to: create a self-signed certificate

**1. Create a private key and Certificate Signing Request (CSR)**

```
openssl genrsa -out client.key 2048
openssl req -new -key client.key -out client.csr
```

**2. Sign the CSR by the demo CA**

```
openssl x509 -req -days 365 -in client.csr -CA demo.pem -CAkey demo.key -CAcreateserial -out client.pem
```
