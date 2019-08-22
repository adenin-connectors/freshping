# freshping

## Setup Instructions

After connecting a Card to the Freshping integration in Digital Assistant, navigate to the _Settings_ tab of the configuration modal:

![settings](/docs/settings.png)

First, make sure the _Roles_ field has a correct value. It should contain a comma-delimited list of user roles that should see the data from Freshping. Options are _User_, _Editor_ and _Administrator_ - adding the _User_ role will also include the other two roles, and likewise adding the _Editor_ role will also include those of _Administrator_ role.

Next, copy the webhook URL value displayed in the modal, highlighted in the above screenshot. Head to the Freshping WebUI at _app.freshping.io_ and select the _Integrations_ page under _Settings_ - under the _Webhook_ area select _+ Create Integration_.

![integrations](/docs/integrations.png)

Finally, just paste in the URL copied from the Freshping settings modal earlier, to the webhook URL field and _Create_.

![add-webhook](/docs/add-webhook.png)
