#include <iostream>
using namespace std;
int main() {


    string PIN,pin,request,YES;
    int x;

    cout <<" Witaj w bankomacie BANK INC. S.A"<<endl;
    cout <<"Prosze podaj numer PIN: ";
    cin >> PIN;
    cout << "Prosze podac jeszcze raz numer PIN w celu potwierdzenia weryfikacji:";
    cin >> pin;
    if(PIN==pin){
        cout <<"Podano prawidlowy kod PIN"<<endl;
    }
    else
    {
        cout <<"Podano niewlasciwy PIN"<<endl;
        cout <<"Czy chcesz powtorzyc operacje ? Wpisz Tak w celu powtorzenia operacji lub Nie w celu jego zakonczenia."<<endl;
        cin >> request;
        YES="TAK";
        if(request==YES)
        {
            cout <<"Prosze podaj numer PIN: ";
            cin >> PIN;
            cout << "Prosze podac jeszcze raz numer PIN w celu potwierdzenia weryfikacji:";
            cin >> pin;
        }
        else
        {
            cout<<" Ponownie podano bledny PIN"<<endl;
            cout<<" Nastapi wyjscie z programu"<<endl;
            return 0;
        }
    }
    cout <<"Witaj uzytkowniku jestes bankrutem nie podaje sie PINU do banku w losowym programie";
    return 0;
}