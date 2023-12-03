---
layout: post
title:  "Connect to remote machine without password with ssh"
date:   2019-10-26 10:00:40
draft: true
blurb: "A look at an example post using Bay Jekyll theme."
og_image: /assets/img/content/post-example/Banner.jpg
---

<img src="{{ "/assets/img/content/post-example/Banner.jpg" | absolute_url }}" alt="bay" class="post-pic"/>
<br />
<br />





<br />


#### Table of Contents
1. [What are private and public keys?](#what-are-private-and-public-keys?)
2. [On the Local Machine](#on-the-local-machine)
3. [On the Remote Machine](#on-the-remote-machine)
3. [Conclusion](#conclusion)

#### What are private and public keys?

<br />
<br />

#### On the Local Machine

ssh-keygen (passphrase empty and put path to file, that should go to users/ana/.ssh/keys)

<br />
in the file ~/.ssh/config, paste 
    Host host
        HostName host
        User user
        IdentityFile /path/to/private/key

<br />
copy the public key (open key.pub and copy)
<br />


#### On the Remote Machine
in the remote machine, in directory ~/.ssh create file names authorized keys and paste there the public key
now when you, in a new terminal window try to access the remote machine through ssh, you won’t need a password

<br />

#### Conclusion
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<br />
