import socket
import sys

from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

class SimpleEcho(WebSocket):

    def handleMessage(self):
        # echo message back to client
        # self.sendMessage(self.data)
        print self.address, 'Sending EMBR script to Panda3d app'
        print "in _send_embr function: message:", self.data
        message = self.data
        # Create a TCP/IP socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # sock = socket.socket()
        # sock = socket.socket(AF_INET, SOCK_DGRAM)

        # Connect the socket to the port where the server is listening
        server_address = ('localhost', 5555)
        print 'connecting to Ben on %s port %s' % server_address
        '''       
        sock.connect(server_address)
        print 'sending EMBR script to Ben'
        # TCP socket function
        # sock.sendall(self.data)
        
        # UDP socket function
        sock.sendto(self.data, server_address)
        print 'closing socket for Ben'
        sock.close()
        '''
        try:
            client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client.connect(server_address)
            client.send(message)
            client.shutdown(socket.SHUT_RDWR)
            client.close()
        except Exception as msg:
            print msg
        
        
        #try:
            # Send data
            # message = 'This is the message.  It will be repeated.'
        #    print 'sending "%s"' % message
        #    sock.sendall(message)

            # Look for the response
        #    amount_received = 0
        #    amount_expected = len(message)

         #   while amount_received < amount_expected:
            #    data = sock.recv(16)
            #     amount_received += len(data)
            #    print 'received "%s"' % data

        #finally:
        #    print 'closing socket'
        #    sock.close()

    def handleConnected(self):
        print self.address, 'connected to HTML Client'

    def handleClose(self):
        print self.address, 'closed connection to HTML Client'

server = SimpleWebSocketServer('', 1337, SimpleEcho)
server.serveforever()