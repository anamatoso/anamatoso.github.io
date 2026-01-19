---
layout: post
title:  "How to create a webhook in Discord for bash scripts"
date:   2023-02-20 10:00:40
draft: false
featured: true
blurb: "So that you get notified when a script finishes running"
og_image: images/webhook_discord.png
---

#### Table of Contents
1. [Introduction](#introduction)
2. [Discord Settings](#discord-settings)
3. [Create the bash script to send a message to discord](#create-the-bash-script-to-send-a-message-to-discord)
4. [Add to the script you want to monitor](#add-to-the-script-you-want-to-monitor)


<br />

#### Introduction

<p align="justify">Discord is a popular messaging platform used by many teams for communication and collaboration. One of the useful features of Discord is the ability to create webhooks, which can be used to send messages to a channel in real-time using a bot. In this blog post, we will explore how to design a webhook on Discord to alert us when a Bash script ends running.
</p>


<p align="justify">Before we dive into the details, let's first understand what a webhook is. A webhook is a way for an application to provide other applications with real-time information. It is an HTTP callback that is triggered by an event and sends data to a specific URL. In the specific case of Discord, a webhook can be used to send messages to a specific channel.
</p>


<p align="justify">Now, let's assume we have a Bash script that we want to monitor. We want to receive a notification on Discord when the script ends running. There are essencially three main steps:
</p>

1. Create a webhook on the discord server you want to be notified in;
2. Create the script that will send the message to discord channel;
3. Add the execution of this script on the end of the script you want to monitor.

<br />

#### Discord Settings
To create the webhook follow the instructions below:

1. Go to the discord app on your computer and open the server you want to be notified in;
2. Click on the settings icon for the server, then click on "Integrations";
3. Click on "Webhooks", then "New Webhook";
4. Give your webhook (Bot) a name and select the channel you want to send the notifications to;
5. Save your changes and your webhook is now created.

The webhook will have a **webhook URL** that you will need later.

<br />

#### Create the bash script to send a message to discord
<p align="justify">Now that we have a webhook set up in Discord, we need to create a Bash script to send the notification when the script you want to monitor has finished running. Here is a sample script:
</p>

```bash
#!/bin/bash
message="$@"
msg_content=\"$message\"

url='YOUR_WEBHOOK_URL' ## discord webhook
curl -H "Content-Type: application/json" -X POST -d "{\"content\": $msg_content}" $url
```

<p align="justify">In this script, we use the curl command to send a message to the webhook URL we created earlier. We set the message to "$@" so that the arguments of the script will be the message that will be sent.
You will need to **replace** "YOUR_WEBHOOK_URL" with the actual webhook URL that you got from the previous section.
</p>
<br />


#### Add to the script you want to monitor

<p align="justify">For the sake of this section, let's assume you named the previous script as `finish_message.sh`. 
In end of the script you want to monitor, add the path to this script with the message you want to send to the channel, as such:
</p>

```bash
PATH/TO/FILE/finish_message.sh MESSAGE
```

<p align="justify">And that's it. Now everytime the script finishes, it will send MESSAGE to the channel you selected in the discord webhook.
</p>

<p align="justify">As a final note, if you want to tag someone in the message then you will need to:
</p>
1. Go to the advanced settings on discord and enable developer mode (for more information and pictures see this [link](https://www.businessinsider.com/guides/tech/discord-id));
2. Find the person you want to tag and press with a right click on their profile and select "copy ID" (this options will only show up if you complete 1.);
3. To tag the person in the message, write "<@PERSON_ID>" where PERSON_ID is the ID you copied. Note that the inverted commas are mandatory. Example: "<@80351110224678912>". 

<p align="justify">Note you can also tag roles, channels, to see how, check this <a href="https://discord.com/developers/docs/reference#message-formatting-formats">link</a>.
</p>