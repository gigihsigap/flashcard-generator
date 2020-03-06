# Flashcard Generator
Flashcard Generator is a flash card single-page app. This app aims to facilitate language learning through flash card memorization. The random card generator can create new cards that contain randomly selected its definition and translation, if available.Features:
- Each account have their own card set.
- Online English-to-Bahasa Indonesia translator.
- Random card generator.
- CURSED translation results. This is why we don't trust machines to do translating for us.Third-party APIs used in this app:> Random Word API (https://random-word-api.herokuapp.com)
> MyMemory API (https://mymemory.translated.net/doc/spec.php)
> wordsAPI (https://www.wordsapi.com/)Given this is our first single-page app, bugs are to be expected. Some of them:- Bad translation results (this is inevitable).
- Card generator processing time might vary (recursive is a curse).
- The bandwith for translating using MyMemory API reaches its limit quickly. Once that happens, it will fail to register the new word since it needs a translated word as criteria (word definition is optional).
- "Undefined" might come out as the translated word.API documentation: https://documenter.getpostman.com/view/10570933/SzRw2Wpr?version=latest
