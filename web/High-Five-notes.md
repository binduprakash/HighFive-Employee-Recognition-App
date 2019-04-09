

### Slash Commands

Starting Point: 
    
    https://api.slack.com/tutorials/tunneling-with-ngrok

- Local Host solution:
    - download nGrok
    - after insalling - from the command line, run (assuming server is running on 3000)
    ./ngrok http 3000

**currently a free account, so the public URL changes each time you restart computer**?    
    - would need to login to Slack app and update slash command 'Request URL' and include /slack to properly route it
    - can also view the tunnels online ngrok | https://dashboard.ngrok.com/status