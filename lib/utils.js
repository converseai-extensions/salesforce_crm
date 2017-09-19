function getClientId(body) {

  if (body == null || body.payload == null) {
    return "";
  }

  var registrationData = body.payload.registrationData;

  var clientId = null;
  if (registrationData != null && registrationData.app != null) {
    clientId = registrationData.app.client_id
  }

  return clientId;
}

function createConnection(oauthToken, body) {

  var registrationData = body.payload.registrationData;

  var clientId = registrationData.app.client_id;

  var clientSecret = registrationData.app.client_secret;

  var redirectUri = body.payload.redirectURI;
  if (!redirectUri && oauthToken && oauthToken.redirect_uri) {
    redirectUri = oauthToken.redirect_uri;
  }

  var instanceUrl = "";
  var accessToken = "";
  var refreshToken = "";

  if (oauthToken != null) {
    instanceUrl = oauthToken.metadata.instanceUrl;
    accessToken = oauthToken.access_token;
    refreshToken = oauthToken.refresh_token;
  }

  var jsforce = require('jsforce');
  try {
    var conn = new jsforce.Connection({
      oauth2: {
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectUri,
      },
      instanceUrl: instanceUrl,
      accessToken: accessToken,
      refreshToken: refreshToken
    });

    var caller = body.caller;

    conn.on("refresh", (newToken, res) => {

      var bodyData = {
        access_token: newToken,
        refresh_token: refreshToken,
        token_type: "Bearer",
        expires_in: -1,
        grant_type: "authorization_code",
        metadata: {
          instanceUrl: instanceUrl
        }
      }

      var request = require('request');

      var options = {
        headers: {
          "X-CONVERSE-PLUGIN-INVOKER": Buffer.from(JSON.stringify(caller)).toString('base64')
        },
        method: 'PUT',
        body: bodyData,
        json: true,
        url: "https://" + caller.provider.providerDomain + "/api/plugins/data/oauth2?type=invoker"
      }

      request(options, function(err, res, body) {
        if (err) {
          console.error('Failed updating oauth2 data in data service : ' + String(err))
          return;
        }
        console.log("Updated oauth2 data in data service");
      });

    });

    return conn;
  } catch (err) {
    var errString = "Failed to create connection " + String(err);
    console.error(errString);

    return {
      error: errString,
      needAuth: err.name == "invalid_grant"
    };
  }

  return {
    error: "Unknown Error"
  };
}

module.exports = {
  createConnection: createConnection,
  getClientId: getClientId
}
