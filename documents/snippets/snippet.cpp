#include <iostream> 
            
int main(int argc, char **argv){
    const std::string lesLangages[] = {"C", "C++", "Java", "Python", "R", "SQL", "COBOL", "VBA", "JavaScript", "HTML"};
    for (const std::string & lang : lesLangages){
        std::cout << lang << std::endl;
    }
    return 0;
}