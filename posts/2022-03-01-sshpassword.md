---
layout: post
title:  "Connect to remote machine without password with ssh"
date:   2022-03-01 10:00:40
draft: false
featured: true
blurb: "How to stop writing your password"
og_image: images/publicprivatekey.png
---

#### Table of Contents
1. [What are private and public keys?](#what-are-private-and-public-keys?)
2. [On the Local Machine](#on-the-local-machine)
3. [On the Remote Machine](#on-the-remote-machine)
3. [Conclusion](#conclusion)

#### What are private and public keys?

Public and private keys are fundamental components of asymmetric cryptography, a cryptographic system that uses pairs of keys for encryption and decryption. These keys play a crucial role in securing digital communication and ensuring the authenticity, confidentiality, and integrity of data. Here's an little explanation of what public and private keys are and their common applications:

<b>Public Key</b>:
A public key is a cryptographic key that is openly shared and distributed. It is used for encrypting data or messages intended to be sent to the owner of the corresponding private key. The file of a public key has the .pub extension

<b>Private Key</b>:
A private key is the complementary counterpart to a public key and is kept secret by its owner. It is used for decrypting data or messages that have been encrypted using the corresponding public key. Private keys are known only to the key owner and are kept confidential to ensure the security of the communication. Do not share them.

<b>Common Uses</b>:
Secure Communication: Public and private keys are widely used in secure communication protocols such as SSL/TLS for encrypting data transmitted over the internet, ensuring confidentiality and integrity.
Digital Signatures: Private keys are used to create digital signatures, which can be verified using the corresponding public key. Digital signatures are crucial for verifying the authenticity and integrity of digital documents and transactions.
Authentication: Public keys are often used in authentication systems, where they are used to verify the identity of users or devices without revealing sensitive information such as passwords.

Overall, public and private keys are essential tools in modern cryptography, enabling secure communication, authentication, and data integrity in various applications across digital systems and networks.

Now let's look at how we can create a private public key pair so that when accessing a server, you don't have to write its password, thus making the process faster and easier, without compromising security.

<br />

#### On the Local Machine
Use the command ssh-keygen on the terminal to create the public and private keys.

````
ssh-keygen
````

Write the path to the keys (including the name of the file), that should go to folder /Users/[user]/.ssh/keys, where [user] is the name of your user in the local machine. Leave the passphrase empty.

Afterwards, in the file ~/.ssh/config, paste 

````
Host [host]
    HostName [host]
    User [user]
    IdentityFile /path/to/private/key
````
where [host] is the IP of the host computer (remote) and [user] the name of the user in that host computer.

Then copy the public key (open key.pub and copy the text) to be pasted later.

<br />

#### On the Remote Machine
Access the remote machine, and in directory ~/.ssh, create a file named "authorized_keys" and paste there the public key you copied from before.

With all of these steps done, in a new terminal window try to access the remote machine through ssh. You shouldn't need a password anymore.

If it still does not work, try to copy the file of the public key (key.pub) to the remote machine to the directory ~/.ssh.

<br />

#### Conclusion
That's all. This way, it is far easier to access your remote server and just as secure.

<br />
