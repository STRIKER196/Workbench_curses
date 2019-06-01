#include <iostream>

using namespace std;

int main()
{
    int a;
    cout << "test"<<endl;
    cout << "------------------------------------------------------------"<<endl;
    cout << "Ile jest stundetow/uczniow jest w twojej uczelni/szkole?     "<<endl;
    cin >> a;
    cout << "Na podstawie twoich dancyh w twoijej uczelni lub szkole jest tylko:      ";
    cout << a <<endl << "milego dnia"<< endl;

    cout <<"-------------------------------------------------------------"<<endl;

    int uczniowie,cukierki,dodatek,x,y;
    cout <<"Jas ma urodziny i mama powiedziala Jasiowi ze 'bedzie mogl zjesc reszte cukierkow wieczorem po tym jak rozda reszte w szkole na zajeciach wszystkim w klasie i nauczycielce' "<<endl;
    cout <<"Jak sadzisz ile jest uczniow w klasie Jasia?  ";
    cin >> uczniowie;

    cout <<"Jezeli w klasie Jasia jest "<< uczniowie<<" uczniow to mama musi kupic przynajmniej "<< uczniowie <<"   cukierkow, wiec najlepiej bedzie jak dodamy do tej liczby dodatkowe cukierki. Ile mamy ich dolozyc? ";
    cin >> dodatek;
    cukierki = uczniowie + dodatek;
    x = cukierki /(uczniowie-1);
    cout <<"Cukierkow dla kazdego ucznia: "<< x;

    y = cukierki - x *(uczniowie-1);
    cout <<endl<<"Dla jasie na wieczor zostalo: "<<y<<endl;
    cout <<"Dziekuje za uwage";

    return 0;
}



