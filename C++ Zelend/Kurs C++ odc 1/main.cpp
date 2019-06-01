#include <iostream>

using namespace std;

int main()
{
    int a;
    cout << "test"<<endl;
    cout << "------------------------------------------------------------"<<endl;
    cout << "Ile jest stundetow w twojej uczelni?     "<<endl;
    cin >> a;
    cout << "Na podstawie twoich dancyh w twoijej uczelni jest tylko:      ";
    cout << a << "milego dnia"<< endl;

    cout <<"-------------------------------------------------------------"<<endl;

    int uczniowie,cukierki,x,y;
    cout <<"Ile uczniow jest w Twojej klasie:   ";
    cin >> uczniowie;

    cout <<"Ile cukierkow kupila Mama?     ";
    cin >> cukierki;

    x = cukierki/(uczniowie-1);
    cout <<"Cukierkow dla kazdego ucznia: "<< x;

    y = cukierki-x*(uczniowie-1);
    cout <<endl<<"Dla jasie na wieczor zostalo: "<<y<<endl;
    cout <<"Dziekuje za uwage";

    return 0;
}



