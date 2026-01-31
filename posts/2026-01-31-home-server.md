---
layout: post
title:  "My Home Server"
date:   2025-12-03 10:00:40
draft: false
blurb: "What apps do I run in my home server"
#og_image: images/homepage.png
---

<center><img src="./images/homepage.png" width="600px"></center>


# Table of Contents
1. [Introduction](#introduction)
2. [Hardware](#hardware)
3. [Software](#software)
    * 3.1 [Homepage](#homepage)
    * 3.2 [Portainer](#portainer)
    * 3.3 [Plex](#plex)
    * 3.4 [Immich](#immich)
    * 3.5 [OpenWebUI](#openwebui)
    * 3.6 [n8n](#homepage)
4. [Limitations](#limitations)
5. [Future](#future)

<br />

# Introduction

<p align="justify">After almost 10 years of service, the keyboard of my 13in Macbook Pro 2015 stopped working and so I had to deal with two issues: buying a replacement one, and disposing my old one. 
<br /><br />
The first issue was solved fairly quick, as coincidently my birthday was comming up and so I bought a refurbished 2021 Macbook Pro (that was when I realised how slow my old laptop was and what storage really meant, going from 128Gb to 512Gb). 
The second issue turned into and opportunity as the laptop was still functioning, and it had quite a sentimental value. So I turned it into my home server and started going into the rabbit hole of <i>homelabing</i>.
</p>
<br />

# Hardware

I won't lie, it does not have great specs by today's standards: 128Gb of storage, 8Gb of RAM (DDR3), Intel Iris Graphics, dual-core i5 CPU (2.7GHz), but for my current use, it's fine, as long as I'm aware of its limitations.
<center><img src="https://en.meming.world/images/en/b/be/But_It%27s_Honest_Work.jpg" width="400px"></center>

On the other hand, it has some advantages: it has a battery (though it does not last long on a full charge, it lasts a couple of hours) which comes in handy when there are power outages. It's also fairly energy efficient and quiet (as long as I tune the fans correctly).

I also added a wired connection with ethernet so that internet is faster and more robust, and mounted a 2Tb hard drive as my long term storage (see [Limitations](#limitations) and [Future](#future) for more info on this). 


# Software

<p align="justify">The server is running MacOS Monterey (v12.7.6). I tried switching to linux (what I use at work), but since the MacOS was running well and it had great compatibility with my current Mac, I felt that there was no need to change OS. Plus, with Tailscale, I can easily troubleshoot remotely.
</p>
<br />
<p align="justify">Now as seen in the banner image, I have 6 apps running on my server. Below there's a short description of each of them.
</p>


### Homepage

I use Homepage (https://gethomepage.dev/) so that I can use the IP of the macbook as homepage where I have hyperlinks to all my apps and to some stats. This way I don't have to remember the ports of each app/service. 

### Portainer

All the apps mentioned in this blog post are docker containers, with the exception of Plex, since it did not work well in a container. Portainer helps managing the containers/stacks, especially in a remote setting, with a nice interface.

### Plex

This is the main reason why I have a home server. With Plex Media Server, I can access all my media content as long as I am in my home network, as is the case of the TV in my living room and any device I install Tailscale on 😉.

### Immich

Immich (https://immich.app/) is my google photos replacement. I have it setup so that it saves the photos from my phone to a folder on the mounted hard drive, and automatically it organizes them by year and names them accordingly. Very neat self-hosted alternative to google photos. The only downside is that it only backs up the images when I'm at home (as I don't continuously run Tailscale in my phone). It also has a very similar UI to google photos so it feels familiar.

### OpenWebUI

OpenWebUI (https://openwebui.com/) is my self-hosted ChatGPT interface running local models. I admit, this is the app I use the least because the models that I'm able to run in my server are very slow and innacurate due to my hardware limitations. But it is very cool to learn, so that when I upgrade, I already know what to do.

### n8n

My self-hosted automations (https://n8n.io/). Right now, I only have one automation setup: to send a daily email when new media is added to the Plex Server letting my family know what new episodes/movies were added.

However, this platform has imense potential, with several integrations, from Google Services to LLM models.


# Limitations

<p align="justify">This setup has some limitations. The main limitation is the hardware, which impacts especially the OpenWenUI app, which I particularly liked to implement, so that I can cut back on commercial models.</p>
<p align="justify">Another drawback is the fact that the battery does not last very long (I use alDente Mac app to have it set always to 90%), so if a power outage is too long, I need to physically click the power on button for it to turn on. Plus, I recognize that there are much more efficient set ups, like for instance a raspberry pi.</p>
<p align="justify">Additionally, by saving data only on the one hard drive, I set myself for disaster when (not if) it fails. Redundancy of data is a must have in situations like this.</p>

# Future

<p align="justify">
As for my future plans, clearly, a NAS solution would be best, with two drives in a RAID 1 setup, having another disk as a backup off-site. Also, I'd like to increase efficiency by having down hours during the night.
As for future apps I'de like to self-host, here are some:

</p>
<ul>
    <li><b>Bitwarden/Vaultwarden</b>: My password manager of choice. I would very much like to run its self-hosting option, but due to the likelihood of power outages in my house I don't trust the reliability that would be provided and will keep using the servers in the EU.</li>
    <li><b>Nextcloud</b>: A cloud drive alternative. I already tested it and it's great, but I likely will only run this when the redundant setup is done.</li>
    <li><b>Paperless</b>: Similar to Nextcloud but for paper documents. I also already tested it and did not find it to be enough to replace Nextcloud, at least for my needs.</li>
    <li><b>Home assistant</b>: Basicaly automation for the house. I've already tested it, but for the number of IoT devices I have (currently only two smart outlets), managing all through SmartThings is more than enough.</li>
</ul> 

After all this, having a domain would be the probable next step, but that is a distant future still.

All in all, entering this <i>homelabing</i> journey, taught me many things, from networking, to working with all these tools, but most of all, so much troubleshooting.