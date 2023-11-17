(function execute(inputs, outputs) {
  // Get the stored credentials from ServiceNow Credentials
    var credentials = new GlideRecord('sn_credential_store');
    credentials.addQuery('name', 'Shared-Services-SNS-SQS-Credentials');  
    credentials.query();
    if (credentials.next()) {
     var accessKey = credentials.getValue('access_key_id');
     var secretKey = credentials.getValue('secret_access_key');
  
    // AWS SNS parameters
    var topicArn = 'arn:aws:sns:us-east-1:193244750463:ServiceNow-SNS-Topic';
    var message = JSON.stringify({
      requirements: {
        CPU: inputs.cpu,
        RAM: inputs.ram,
        NumberOfDisks: inputs.number_of_disks,
        DiskStorage: inputs.disk_storage,
        Image: inputs.image
      }
    });
  
    // Create an instance of GlideHTTPRequest
    var request = new GlideHTTPRequest();
  
    // Set the request parameters
    request.setEndpoint('https://sns.us-east-1.amazonaws.com');
    request.setBasicAuth(accessKey, secretKey);
    request.setRequestHeader('Content-Type', 'application/json');
  
    // Construct the request body
    var requestBody = 'Action=Publish';
    requestBody += '&TopicArn=' + encodeURIComponent(topicArn);
    requestBody += '&Message=' + encodeURIComponent(message);
  
    // Send the HTTP POST request
    var response = request.post(requestBody);
  
    // Check the response and handle accordingly
    if (response.getStatusCode() === 200) {
      gs.info('Message published successfully')
      outputs.erroroutput = response;
    } else {
      outputs.erroroutput = response.getBody();
    }
  }
    outputs.erroroutput = accessKey;
  })
  (inputs, outputs);