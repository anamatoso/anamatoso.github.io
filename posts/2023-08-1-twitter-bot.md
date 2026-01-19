---
layout: post
title:  "How to create a twitter bot"
date:   2023-08-01 10:00:40
draft: true
og_image: images/banner_twitterbot.png
---

#### Table of Contents
1. [Introduction](#introduction)
2. [Create the bot account](#create-the-bot-account)
3. [Developer account](#developer-account)
4. [Run script](#run-script)


<br />

#### Introduction

<p align="justify">We all know Twitter (or should I say X now?). It's a great place for (good and bad) discussions, connect with other people and where trends are made. However, amidst the sea of tweets and trending hashtags, there's a silent yet quirky underbelly that often goes unnoticed - the realm of Twitter bots! And I'm not talking about the spam bots, those are quite a few and they are malicious. Twitter bots are just twitter accounts that post automated tweets. For this, one only has to use the Twitter API (Application Programming Interface) to make the account do whatever you like, from post, retweet and comment tweets to even more complex (and possibly costly) stuff.
</p>



<p align="justify">Before we dive into the details, we need to first decide what we want the bot to do. In my case, since I wanted to start simple, I decided I would create a bot that every day posts a tweet saying whether that day is a holiday in Portugal.
</p>


<p align="justify">Now, I will divide the procedure in 3 steps:
</p>

1. Create a bot account;
2. Create the developer account;
3. Create and run the script that will execute the API request

<br />

#### Create the bot account
To create the bot account, one only needs to create a regular twitter account.

Pro tip for Gmail users: if you don’t want to create a different email for your account, you can use your personal account like this johndoe+filter[@]gmail.com where johndoe is your regular email and filter is any word you choose. All emails sent to this address will be sent to johndoe[@]gmail.com. Additionally you can create a filter for the incoming messages based on the sent address.



<br />

#### Developer account
<p align="justify">Now that we have a twitter account, go to <a href=" https://developer.twitter.com"> https://developer.twitter.com</a> and sign in with the credentials of the account created above.
Then, click on "Developer Portal" in the upper right corner to enter your dashboard.

After this click on "Projects and Apps" in the left tab and select the overview. There, you should have the project app (both the project and the app will have weird names that you can rename for readability). Click on the gear icon to access the app settings.

In the settings, edit the user authentication settings, enabling read and write permissions, selecting "web app, automated app or bot" and then writting the callback url and the website url which, if you don’t have a website, it can be a placeholder url such as https://example.com. After saving the changes it should redirect you again to the app settings. 

Now, go to "Keys and tokens" at the top and you will need the following codes for the script:
- Access Token
- Acess Secret
- Client ID
- Client Secret

<b>Important note: </b> Do not share these codes with anyone or make them publicly available!

</p>


<br />


#### Run script

<p align="justify">Having decided what you want to do with the bot, you need to write the python script that will execute the wanted commands. In my case, I want it to post daily tweets and if the day is a holiday I want it to say which holiday is it. 

In my case, I wrote the following python script where the capitalized variables are the codes from above:

</p>

```python
#%%
import tweepy
import holidays
from datetime import datetime, date
import time


#%%
# Add your API keys and access tokens here
consumer_key = $CONSUMER_KEY
consumer_secret = $CONSUMER_SECRET
access_token = $ACCESS_TOKEN
access_token_secret = $ACCESS_SECRET


client = tweepy.Client(consumer_key=consumer_key,
                       consumer_secret=consumer_secret,
                       access_token=access_token,
                       access_token_secret=access_token_secret)

# Get holiday list
pt_holidays = holidays.country_holidays('PT')

if __name__ == "__main__":
    while True:
        now = datetime.today().date()
        if now in pt_holidays:
            nome_feriado=pt_holidays[now]
            response = client.create_tweet(text='Hoje é feriado! \nÉ '+ nome_feriado)
        else:
            response = client.create_tweet(text='Bom dia. \nInfelizmente, hoje não é feriado')
        time.sleep(86400)

```

Now you need to be constantly running this code 24/7 so I would suggest running in on some kind of server or a raspberry pi, or in an old computer.

#### Bonus Section
<p align="justify">
Firstly, thank you for reading this far!

Now, if you want your bot's twitter account to have a shameless plug to your account, having a tag that says it is automated by your account, you only need to follow these steps:

1. Sign in to your bot's twitter account
2. On the left panel go to More > Settings and Support > Settings and Privacy
3. Select "Your account" in the menu and then "Account Information"
4. At the bottom, select "Automation" and enter the credentials of the account you want to be the one that is known to manage the bot account.

After all this, the profile of your bot account should have a label below the profile picture that states that it is managed by your account (tagging you).

Now you're all set

</p>


