package com.kipachat.manager;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kipachat.model.MessagesData;

import org.jivesoftware.smack.AbstractXMPPConnection;
import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.SmackException;
import org.jivesoftware.smack.XMPPException;
import org.jivesoftware.smack.chat2.Chat;
import org.jivesoftware.smack.chat2.IncomingChatMessageListener;
import org.jivesoftware.smack.packet.Message;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;
import org.jxmpp.jid.DomainBareJid;
import org.jxmpp.jid.EntityBareJid;
import org.jxmpp.jid.impl.JidCreate;
import org.jxmpp.stringprep.XmppStringprepException;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;

public class ChatManager extends ReactContextBaseJavaModule {

    private AbstractXMPPConnection mConnection;
    private ArrayList<MessagesData> mMessagesData = new ArrayList<>();

    public static final String TAG = ChatManager.class.getSimpleName();
    public static final String DOMAIN_XMPP = "192.168.1.8";

    public ChatManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ChatManager";
    }

    @ReactMethod
    public void setConnection(
            final String username,
            final String password
//            final Callback callback
    ) {
        new Thread() {
            @Override
            public void run() {

                InetAddress addr = null;
                try {

                    // inter your ip4address now checking it
                    addr = InetAddress.getByName(DOMAIN_XMPP);
                } catch (UnknownHostException e) {
                    e.printStackTrace();
                }
                HostnameVerifier verifier = new HostnameVerifier() {
                    @Override
                    public boolean verify(String hostname, SSLSession session) {
                        return false;
                    }
                };
                DomainBareJid serviceName = null;
                try {
                    serviceName = JidCreate.domainBareFrom(DOMAIN_XMPP);
                } catch (XmppStringprepException e) {
                    e.printStackTrace();
                }
                XMPPTCPConnectionConfiguration config = XMPPTCPConnectionConfiguration.builder()

                        .setUsernameAndPassword(username, password)
                        .setPort(5222)
                        .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled)
                        .setXmppDomain(serviceName)
                        .setHostnameVerifier(verifier)
                        .setHostAddress(addr)
                        .setDebuggerEnabled(true)
                        .build();
                mConnection = new XMPPTCPConnection(config);


                try {
                    mConnection.connect();
                    // all these proceedure also thrown error if you does not seperate this thread now we seperate thread create
                    mConnection.login();

                    if (mConnection.isAuthenticated() && mConnection.isConnected()) {
                        //now send message and receive message code here

                        Log.e(TAG, "run: auth done and connected successfully");
                        org.jivesoftware.smack.chat2.ChatManager chatManager = org.jivesoftware.smack.chat2.ChatManager.getInstanceFor(mConnection);
                        chatManager.addListener(new IncomingChatMessageListener() {
                            @Override
                            public void newIncomingMessage(EntityBareJid from, Message message, Chat chat) {
                                Log.e(TAG, "New message from " + from + ": " + message.getBody());

                                MessagesData data = new MessagesData("received", message.getBody().toString());
                                mMessagesData.add(data);

//                                callback.invoke(data);

                                //now update recyler view
//                                runOnUiThread(new Runnable() {
//                                    @Override
//                                    public void run() {
//                                        //this ui thread important otherwise error occur
//
//                                        mAdapter = new Adapter(mMessagesData);
//                                        mRecyclerView.setAdapter(mAdapter);
//                                    }
//                                });
                            }
                        });

                    }


                } catch (SmackException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (XMPPException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }.start();
    }

    @ReactMethod
    public void sendMessage(String messageSend, String userId) {
        String entityBareId = userId + "@" + DOMAIN_XMPP;

        EntityBareJid jid = null;
        try {
            jid = JidCreate.entityBareFrom(entityBareId);
        } catch (XmppStringprepException e) {
            e.printStackTrace();
        }

        if (mConnection != null) {

            org.jivesoftware.smack.chat2.ChatManager chatManager = org.jivesoftware.smack.chat2.ChatManager.getInstanceFor(mConnection);
            Chat chat = chatManager.chatWith(jid);
            Message newMessage = new Message();
            newMessage.setBody(messageSend);

            try {
                chat.send(newMessage);

//                MessagesData data = new MessagesData("send", messageSend);
//                mMessagesData.add(data);

            } catch (SmackException.NotConnectedException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
