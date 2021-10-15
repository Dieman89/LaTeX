import socket
import os
import time
import platform
import subprocess
import re

operative_system = platform.system()
ping_flag = 'n' if operative_system == 'Window' else 'c'
ports = [20, 22, 25, 53, 80, 587, 631, 3306, 10000, 65000]
ttl_grep = 'grep -o ttl=[0-9][0-9]*'
mac_grep = 'grep -o ..:..:..:..:..:..'
array = []

def regex_chars(str):
    return re.sub('\W+', '', str)

def arp(ip, grep):
    return os.popen('sudo arping -c 1 %s | %s' %(ip, grep)).read()

def ping(ip, flag, grep):
    return os.popen('ping -%s 1 %s | %s' %(flag, ip, grep)).read()

def format_dns(obj):
    dns = os.popen('host -l %s' %(obj['ip'])).read()
    if 'not found' in str(dns):
        obj['dns'] = 'null'
    else:
        obj['dns'] = regex_chars(str(dns).split(' ')[4].rstrip())

def format_ports(obj):
    for port in ports:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        ip = (obj['ip'], port)
        open_port = s.connect_ex(ip)
        if open_port == 0:
            obj['ports'].append(str(port) + ' ')
        s.close()

def format_arp(ip, array, ttl):
    print('------- Setting up the object for: %s -------' %ip)
    arped = arp(ip, mac_grep)
    ttl_num = ttl.split('=')
    obj = {
        'ip': ip,
        'ttl': ttl_num[1].rstrip(),
        'arp': str(arped).rstrip(),
        'ports': [],
        'dns': '' }
    array.append(obj)
    print('Populating the object with open ports...')
    format_ports(obj)
    print('Populating the object with DNS...')
    format_dns(obj)
    print('------- Object for: %s fully populated -------' %ip)

def printer(arr):
    for item in arr:
        open_ports = ''
        for port in item['ports']:
            open_ports += str(port)
        print('----------------------------------------------------------')
        print('IP: %s' %item['ip'])
        print('MAC: %s' %item['arp'])
        print('Open Ports: %s' %open_ports)
        print('DNS: %s' %item['dns'])
        print('TTL: %s' %item['ttl'])

def ip_builder(end):
    return '192.168.69.%s' %str(end)

def txt(pos):
    if pos == 'start':
        print('------- 4ct1v3 3num3r4t10n by Alessandro Buonerba -------')
    if pos == 'end':
        print('-------------------- GitHub: Dieman89 -------------------')
    if pos == 'summary':
        print('--------------------- Summary Report --------------------')

def summary(array, time_start):
    total_ips = ip_to - ip_from
    ok_counter = len(array)
    failed_counter = total_ips - len(array)
    time_elapsed = time.time() - time_start

    print('Total IP Scanned: %s' %total_ips)
    print('IP Successfully scanned: %s' %ok_counter)
    print('IP that did not respond: %s' %failed_counter)
    print('Time elapsed: %.2f seconds' %time_elapsed)
    print('')
    print('Starting IP: 192.168.69.%s' %ip_from)
    print('Ending IP: 192.168.69.%s' %ip_to)

def input_range():
    global ip_from
    global ip_to
    txt('start')
    print('Scan from 192.168.69.???, enter last digits from 0 to 255')
    ip_from = int(input())
    print('Scan till 192.168.69.???, enter last digits from 0 to 255')
    ip_to = int(input())

def main():
    input_range()
    time_start = time.time()
    for end in range(ip_from, ip_to):
        print('Pinging the next IP address and waiting for a response...')
        ip = ip_builder(end)
        ttl = ping(ip, ping_flag, ttl_grep)
        if (str(ttl)):
            print('... %s is online :)!' %ip)
            format_arp(ip, array, str(ttl))
        else:
            print('... %s did not respond :(!' %ip)
        if operative_system == 'Windows':
            subprocess.Popen('cls', shell=True).communicate()
        else:
            print('\033c')
        txt('start')
        printer(array)
        txt('summary')
        summary(array, time_start)
        txt('end')

if __name__ == '__main__':
    main()