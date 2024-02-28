import React from 'react';
import { WebView } from 'react-native-webview';

const StatusWebView = ({ status, back }) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #fff;
            text-align: center;
            padding: 50px;
            font-size: 50px;
          }
        
          .button {
            background-color: #007bff;
            color: #fff;
            border: none;
            font-size: 40px;
            padding: 30px 50px;
            margin-top: 20px;
            cursor: pointer;
            border-radius: 5px;
          }
          .box {
         
            border: 1px solid #ccc; /* Border color and width */
            border-radius: 5px; /* Rounded corners */
            padding: 20px; /* Padding inside the box */
            width: 800px;

          }
        
          .container {
            display: flex; /* Use flexbox for layout */
            margin-left: 10px;
            align-items: center; /* Center vertically */
            height: 80vh; 

          }
        </style>
      </head>
      <body>
      <div class="container">
      <div class="box">


        ${status === 'success' ? `
          <div>
           
            <div>Your password has been reset successfully.</div>
          </div>
        ` : `
          <div>
      
            <div>Failed to reset your password. <br> Please try again.</div>
        
          </div>
        `}
      </div>
    </div>
    <script>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      onMessage={event => {
        if (event.nativeEvent.data === 'back') {
          back();
        }
      }}
    />
  );
};

export default StatusWebView;
