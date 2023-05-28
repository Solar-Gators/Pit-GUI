import time
import os
import urllib.request

def wait_for_url(url, timeout=300, interval=0.25):
    start_time = time.time()  # remember when we started
    while (time.time() - start_time) < timeout:
        try:
            response = urllib.request.urlopen(url, timeout=interval)
            status_code = response.getcode()
            if 200 <= status_code < 400:  # status codes < 400 are successful
                print(f'{url} is up!')
                return True
        except Exception:
            print(f'{url} is not up yet, waiting...')
            time.sleep(interval)  # wait before trying again

    print(f'Timed out waiting for {url} to become available')
    return False

# usage
wait_for_url(os.environ["SERVICE_URL"])
