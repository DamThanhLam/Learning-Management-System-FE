import NodeRSA from "node-rsa";

const publicKeyPEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqlKHHeFCGP6ycc+NvNnU
JrGAqpUBv6GTDH8W8RAeAZdKJIQD9TOkWt/152w2q/KG5LK4HezTeEjDkVZ8+RUW
PHIAhNrngQQ1oKHm78wYMPvb5f1Q9fBNvLEM8DZD2YMpNaTU90ISRwPuxxHBAzux
5iBDfgKi8y8RH0lH+dYyqHNeQbK1H7BgKOzX+odQrmeDKJ1sR0y6h6rzlR2qtYDw
Bep0HyuTbvQZUAmxszxr45rdob1FkWql5TUsaY6ao8ogejb38DKCc25Ffscabp/r
0EmyrUNU5+nCCMgoiD0BkYrhs6Gmnnpz8QuyxDxihXL0LIiJN3F497M/GGI+3doj
CwIDAQAB
-----END PUBLIC KEY-----`;

const encryptPassword = (plainTextPassword: string) => {
    const key = new NodeRSA(publicKeyPEM, "pkcs8-public");
    key.setOptions({ encryptionScheme: "pkcs1" }); // Hoặc "oaep"
    return key.encrypt(plainTextPassword, "base64");
};

export default encryptPassword;