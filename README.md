# SuggestionsBot

- Most Advanced SuggestionsBot, To Handle Your Server's Suggestions.

# Public Version
 
- The Public Version Has Been Down For More Than a Month, Because i dont want to use my only hosting(aws) for this bot, If u want to support me, Check my websites of below.

- [SayHeyToMe](https://sayheyto.me)
- [Zappers](https://zappers.in.net)

# Hosting Guide
- Create a Firebase Project https://firebase.google.com
- Enable Firestore in the Project and Enter All Credentials in ./config.js
- First We Would Deploy The Slash Commands, Run The Command :-

```
node deploy.js
```

Once Deployed, Run:-

```
node shard.js
```

If You Dont Need Sharding, Run:-

```
node index.js
```

# LICENSE

- Check The License File in The Root Dir For License,

> Copyright 2021 ApiDev234

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
