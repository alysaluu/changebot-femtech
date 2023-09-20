from bs4 import BeautifulSoup
import requests

html_text = requests.get('https://medium.com/@BraveNewFilms.org/heres-how-to-contact-all-535-members-of-united-states'
                         '-congress-call-email-tweet-20b8a1c54195').text
soup = BeautifulSoup(html_text, 'lxml')
states = soup.find_all('h1', class_='jq jr ha ba js jt ju iu jv jw jx ix '
                                    'jy jz ka kb kc kd ke kf kg kh ki kj kk kl hw')
body = soup.find('div', class_="ap aq ar as at fw av w")
state_lst = []
dictionary = {}
curr_state = ""

for state in states:
    st = state.text
    state_lst.append(st)


for line in body:
    text = line.text
    list_of_words = text.split()
    rg = len(list_of_words)
    if text == "":
        continue
    if list_of_words[0] in state_lst:
        curr_state = list_of_words[0]
        dictionary[curr_state] = []
    elif (text[0] == "S" or text[0] == "R") and text[1] == "e":
        if curr_state == "":
            continue
        email_index = 0
        pre_phone = True
        name = ""
        email = ""
        for i in range(len(text)):
            if i == len(text) - 5:
                break
            if (not (text[i] == "P" and text[i+1] == "h" and text[i+2] == "o")) and pre_phone:
                name += text[i]
            elif text[i] == "P" and text[i+1] == "h" and text[i+2] == "o":
                pre_phone = False
            elif text[i] == "E" and text[i+1] == "m" and text[i+2] == "a" and text[i+3] == "i":
                email_index = i + 7
                break
        if name[-1] == " ":
            name = name[:-1]
        if email_index != 0:
            for i in range(len(text)):
                if i < email_index:
                    continue
                if text[i] == "@":
                    email += "@opencongress.org"
                    break
                email += text[i]
        tpl = (name, email)
        dictionary[curr_state].append(tpl)

print(dictionary)