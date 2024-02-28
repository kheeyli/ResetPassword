import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import WebView from 'react-native-webview';
import Status from './html/Status';

 
const SuccessPass = ({ show }) => {
    const [status, setStatus] = useState(null);

    const [source, setSource] = useState({
        html: `
            <html>
                <head>
                    <style>
                        html, body {
                            margin: 0;
                            padding: 0;
                            height: 100%;
                        }
                        .title {
                            color: black;
                            font-size: 50px;
                            font-weight: bold;
                            font-family: "Times New Roman", Times, serif; 
                            text-align: center;
                        }
                        .message {
                            font-size: 40px;
                            font-family: "Times New Roman", Times, serif; 
                            text-align: center;
                        }
                        .container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 93vh; /* Set height to 100% of viewport height */
                           
                        }
                        .box {
                            width: 800px;
                            height: 300px;
                            background-color: #F8F8F8;
                            border: 1px solid black;
                            padding: 20px;
                        }

                        button {
                            display: block; 
                            margin: 0 auto; 
                            padding: 30px 50px;
                            font-size: 20px;
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 50px;
                        }
                        a {
                            font-size: 40px;
                            display: flex;
                            justify-content: center;
                        }

                    </style>
                </head>

                <body>
                    <div class="container">
                        <div class="content">
                            <div class="box">
                                <p class="title">Password Reset</p>
                                <p class="message">Click the link to reset account's password. <br></p>
                                <a href="#" onclick="navigate()">Reset Password</a>
                            </div>
                        </div>
                    </div>


                    <script>
                        function navigate() {
                            window.ReactNativeWebView.postMessage("navigate");
                        }
                    </script>


                </body>
            </html>
        `
    });
    const handleWebViewNavigation = (event) => {
        if (event.nativeEvent.data === 'navigate') {
            // Update source to load another HTML content with input for new password
            setSource({
                html: `
                <html> 
                    <style>
                    .container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 93vh; 
                       
                    }
                    .box {
                        width: 800px;
                        height: 300px;
                        background-color: #F8F8F8;
                        border: 1px solid black;
                        padding: 20px;
                    }

                    p {
                        color: black;
                        font-size: 40px;
                        text-align: center;
                    }
                    button {
                            display: block; 
                            margin: 0 auto; 
                            padding: 20px 40px;
                            font-size: 35px;
                            background-color: #4DB2F3;
                            color: white;
                            border: none;
                            border-radius: 5px;
                           
                            cursor: pointer;
                    }

                    input {
                        height: 70px;
                        width: 600px;
                        margin-left: 80px;
                        margin-bottom: 10px;
                        font-size: 45px
                      }
                      
                    </style>

                    <body>
                        <div class="container">
                            <div class="content">
                                 <div class="box">
                                        <p>Enter your new password:</p>
                                        <input type="password" id="newPassword">
                                        <button onclick="submitPassword()">Submit</button>
                                    </div>
                                </div>
                            </div>

                    </body>
                    
                <script>

                function submitPassword() {
                    var newPassword = document.getElementById('newPassword').value;
                    
                    if (newPassword.length >= 8) {
                      
                        window.ReactNativeWebView.postMessage("submit|success|" + newPassword);
                    } else {
                      
                        window.ReactNativeWebView.postMessage("submit|failure");
                    }
                }
            </script>
            
            </html>`
            });
        }  
        
        else if (event.nativeEvent.data.startsWith("submit")) {
            const [_, result] = event.nativeEvent.data.split("|");
            if (result === 'success') {
                setStatus('success');
            } else if (result === 'failure') {
                setStatus('failure');
            }
        }
    };

    if (!show) return null; // Hide the component if show is false
    return (
        <View style={styles.container}>
            {status ? (
                <Status status={status} />
            ) : (
                <WebView
                    originWhitelist={['*']}
                    source={{ html: source.html }}
                    style={styles.webview}
                    onMessage={handleWebViewNavigation}
                />
            )}
        </View>
    );

    

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default SuccessPass;
