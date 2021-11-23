#!/usr/bin/python3

obfus = [
            0x83, 0x4f, 0x8d, 0x50, 0x51, 0x16, 0x57, 0x11, 0x9b,
            0x4c, 0x85, 0x54, 0x93, 0x3f, 0x83, 0x52, 0x81, 0x43,
            0x8b,0x5d
        ] 
v3 = 0
v2 = 1
valid_key = []

while v3 != 20:
    if v2:
        #reverse the process of addition
        valid_key.append(obfus[v3] - 32)
        v2 = 0
    else:
        #reverse the process of subtraction
        valid_key.append(obfus[v3] + 32)
        v2 = 1
    #increment element index
    v3 += 1
print('Key Output')
print([hex(i) for i in valid_key])

with open('license.key', 'wb') as lck:
    valid_key = bytearray(valid_key)
    lck.write(valid_key)

print('\nDone writing key')
