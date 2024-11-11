from selenium import webdriver
from selenium.webdriver.common.by import By

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_login(input):
    driver = setup()

    title = driver.title
    assert title == "Chores"
    driver.implicitly_wait(0.5)

    username_box = driver.find_element(by=By.NAME, value="username")
    password_box = driver.find_element(by=By.NAME, value="password")
    submit_button = driver.find_element(by=By.NAME, value="submit")


    username_box.send_keys(input)
    password_box.send_keys("password")
    submit_button.click()



    profile_name = WebDriverWait(driver, 3).until(
        EC.visibility_of_element_located((By.ID, "profile_username"))
    )
    username = profile_name.text
    print("Current leader: ", username)
    assert username == input

    leaderboard_entries = WebDriverWait(driver, 3).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, 'leaderboard-entry'))
    ) 
    assert len(leaderboard_entries) == 3 

    

    teardown(driver)
   


def setup():
    driver = webdriver.Chrome()
    driver.get("http://localhost:3000")
    return driver

def teardown(driver):
    driver.quit()

test_login("Ryan")
