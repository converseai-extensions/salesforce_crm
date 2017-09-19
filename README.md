# Salesforce CRM
This is an example of create and manipulate records in Salesforce from Converse.

**NOTE:** This plugin is currently available on the Converse platform, under the CRM category named Salesforce. If you are to deploy this code it will be added under the User category to differentiate between your plugin and the published version. Registration documentation can be found [here](https://get.converse.ai/v2/docs/salesforce) to describe how you would link the plugin and Salesforce.

## Prerequisites
1. Ensure you have an account with [Converse.AI](http://www.converse.ai/)
2. Converse.AI extensions run on **Node.JS** `v6.11.1` on **Alpine Linux** so ensure your node development environment matches this setup. We recommend installing Node.JS via [Node Version Manager (NVM)](https://github.com/creationix/nvm).
3. Install and Authorize [Converse.AI CLI tool](https://get.converse.ai/v2/docs/converse-ai-cli).

## Install
5. Clone repo
6. Initialize extension by running `converse-cli plugin init` from your project root.
7. Run `npm test` from your project root to ensure everything was initialized correctly.
8. Deploy the plugin to your Converse.AI account by running `converse-cli deploy` from your project root.
9. If there are no errors, the plugin should be available under "User" in the left hand menu of the designer.
