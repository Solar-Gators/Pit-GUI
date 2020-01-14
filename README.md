# Solargators Telemetry GUI

On the race track we have data being read and recorded on the solar car. Previously this data was read locally and wasn't moved off the vehicle until after the competition. Now we would like to display the realtime telemetry information on a GUI at the the pit. The telemetry information consists of voltage, current, temperature, GPS data, etc.


## Getting Started

First you need to install `node` v12.

If you're running macOS, Linux or [Winows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (WSL). 

```
curl -sL https://deb.nodesource.com/setup_12.14 | sudo -E bash -
```
*note*: You make need to install curl if it's not already

Now install it
```
sudo apt-get install nodejs
```

Now you need to install the dependencies, to do so run the following command from the root of the repository.

```
npm run install-all
```

To start the website in dev mode, run `npm start` and the website will popup a new browser window at localhost:3000.

You are now done with the set up! Hack away :)

## Telemetry Topology

![Solargators Telemetry](https://user-images.githubusercontent.com/7267438/72300857-00a0ed80-3633-11ea-8f7c-e8c1e4817abd.png)

## GUI Preview

![GUI Preview](https://user-images.githubusercontent.com/7267438/72303411-2cc06c80-363b-11ea-9885-1ab1e042f426.png)
