/*
A function to generate a word containing random characters ( uppercase and lower case )
@str - input string whose length will be used to generate the random string
returns @result - the string containing random characters of the same length as the input string
*/
const getRandomStr = (str) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 

    for(let i = 0; i < str.length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

/*
A function to generate the strings containing random characters
-- This function uses the getRandomStr function to generate random characters for each word
-- This function splits the sentence to word
-- calls the getRandomStr function with each word as the arguments 
-- joins each randomly generated words with spaces and returns
@inputStr - The input strings with multiple words
returns - randomStrList containing random characters word
*/
const getRandomStrList = (inputStr) => {
    let strList = inputStr.split(" ");
    let randomStrList = strList.map((str) => {
        return getRandomStr(str);
    });

    return randomStrList.join(" ");
}

export default getRandomStrList;