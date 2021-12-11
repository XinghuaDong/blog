## Welcome to GitHub Pages (Lab3)

### ***Back to [Home](https://xinghuadong.github.io/blog.github.io/)***

### ***[Download](https://github.com/Yvonhu/repo/tree/main/Lab3)***

### Document API for library

#### class: Table
>{
>
>***method:***
>- `Table()`: constructor
>    - Input：None
>- `addDish(std::string name, int dishNumber)`: //Add a dish to the Table
>    - Return value type: void
>    - Input: Customer name, the value of the added dish
>    - Output: None
>- `takeDish(std::string name)`: //takes a dish belonging to the Customer with name in Tables.
>    - Return value type: int
>    - Input: Customer name
>    - Output: Boolean value of whether the take was successful taken away.
>
>***Attributes:***
>- `static Table *s_table`; //Static table object
>- `std::map<std::string, std::vector<int>> m_orders`; //stores the dish of the Customer with the
corresponding name
>- `mutable std::mutex m_tableMutex`; //lock
> 
>};
>
---

#### class Customer
>{
>    
>***method:***
>- `Customer(std::string name, std::vector<int> wanted, Order *order)`; Constructor
>    - Input: indicates the maximum number of wanted
>- `void Start()`; //create a new thread
>- `void Doing()`; //thread main logic
>- `void Stop()`; //Set m_bStopping to true to determine if the thread is stopped
>- `bool IsStop() const`; //Determine if the thread is stopped or not
>- `static void ThreadMain(void *Object)`; //Creates a Customer object and calls the thread main logic
>- `float GetTotalTips() const`; //Returns the total number of tips paid by itself
>- `void FinishCallback()`; //prints out the name and tips when the thread is finished
>
>***Attributes:***
>- `std::string m_name = ""`; //Name
>- `Order *m_order = nullptr`; //Order object
>- `std::vector<int> m_wanted`; //list of dishes that have not yet been ordered
>- `std::vector<int> m_ordered`; //list of dish that have been ordered but not yet fetched
>- `std::vector<int> m_finished`; //list of dishes that have been fetched
>- `bool m_bStopping = false`; //thread stopping flag
>- `mutable std::mutex m_customerMutex`; //lock
>- `std::thread *m_thread = nullptr`; //thread object
>- `float totalTips = 0`; //total tips paid
>
>};
>
---

#### class TipBox
>{
>
>***method:***
>- `TipBox()`; Constructor
>    - Input: None
>- `static TipBox *GetInstance()`; //Get TipBox object
>- `static void Destroy()`; //Destroy the TipBox object
>- `payTips(float tips)`; //put tips into TipBox
>    - Return value: None
>    - Input: the value of the tips to be put into the TipBox
>    - Output: None
>- `getTips()`; Get the total amount of tips in the TipBox
>    - Return value type: float
>    - Input: None
>    - Output: the total amount of tips in TipBox
> 
>***Attributes:***
>- `total`; Indicates the total amount of tips in the current TipBox
>    - Data type: float
>- `static TipBox *s_tb`; //Static TipBox object
>- `mutable std::mutex m_tipsMutex`; //lock
>
>};
>
---

#### class Order
>{
>
>***Methods：***
>- `Order()`; //Constructor
>- `static Order *GetInstance()`; //Obtain Order object
>- `static void Destroy()`; //Destroy Order object
>- `void CreateCustomerThreads(std::string name, std::vector<int> wanted)`; //Create Customer
>objects
>- `void DestoryCustomerThreads(std::string name)`; Destroy Customer object
>- `void FinishCompletedCustomers()`; Closing the completed Customer object
>- `void orderDish(std::string name, int dishNum)`; //Add the corresponding value of dish in the >Table for the Customer with the corresponding name
>- `void deliveryDish(std::string name, int dishNum)`; //Dispatch the dish to the customer with >the corresponding name
>- `void OnDishDelivered(std::string name, int dishNum)`; //Modify the completed dish list >information after successful dispatch
>- `int takeDish(std::string name)`; Take a copy of the customer's dish belonging to the name >from Table
>- `void payTips(float tips)`;// Submit tips to TipBox
>
>***Attributes:***
>- `int totalCustomers = 0`; //counts the total number of customers
>- `std::atomic<int> totalDishes = {0}`; //counts the total number of successful dishes dispatched
>- `static Order *s_order`; //Static Order object
>- `std::map<std::string, Customer *> m_customerThreads`; //corresponds to name and Customer
>- `std::map<std::string, std::vector<int>> m_completed`; //corresponds to name with completed >dish
>- `std::vector<std::string> m_finished`; //records the name of the completed Customer
>- `Table *m_table`; //Table object
>- `TipBox *m_tipbox`; //TipBox object
>- `mutable std::mutex m_orderMutex`; //lock
>}
---

#### Description of the application design and classes
- The function of this application is to simulate the process of customer ordering, picking up and tipping. The loop ends when the customer's wanted dish is consumed. The program loops several times and prints the time spent in each loop, the number of Customers and the number of dish passed at the end of all loops.
- Since multiple Customers are operating at the same time, multiple threads are required for concurrency. When more than one Customer is adding/fetching or paying tips to the table at the same time, in order to prevent the data from being manipulated at the same time, it is necessary to use a lock to make the corresponding variables only be manipulated by the current Customer thread before any one of them is manipulated, and then release the lock after the operation is finished so that other After the operation, the lock is released so that other Customers can operate.

>- For the Table class, It is used to store the dishes added by Order class corresponding to Customer, so it needs a friend class of Customer and Order, and the class has a vector for storing the dishes added by Order of Customer corresponding to name to distinguish the dishes of different Customers.
>- For the Customer class, It is the main class for executing multi-threads, and it needs to add, take away/tips payment operation to Table/TipBox through Order class, so it needs Order's friend class, which has vector for storing its own unadded dish, added but not taken away dish, and taken away dish, which can be used to judge the operation of its own thread.
>- For the TipBox class, It represents a box for storing tips, and only needs to operate on its own properties, so it does not need other friend classes, and is only used to receive tips and display the total tips.
>- For the Order class,It is a class used to concatenate Table, Customer, and TipBox, so it needs friend classes of the other three classes to use the method properties of the corresponding classes. In addition, there are vectors in the class to store the Customer and the completed dish to determine the runtime.

>When the three objects are successfully constructed, the first dish of the Table is taken out in each cycle to determine whether this dish is needed in the customer's wanted. If it is needed, remove the corresponding wanted and put a random amount of tips into the TipBox , And then enter the next cycle; if the dish is not needed in wanted, then enter the next cycle. Until at east one of Table or Customer is empty.

### UML

| Table                                               | Customer                                                            | TipBox                      | Order                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| `Table()`                                           | `Customer(std::string name, std::vector<int> wanted, Order *order)` | `TipBox()`                  | `Order()`                                                                |
| `GetInstance():Table*`                              | `Start(): void`                                                     | `GetInstance(): TipBox*`    | `GetInstance(): Order*`                                                  |
| `Destroy(): void`                                   | `Doing(): void`                                                     | `Destroy(): void`           | `Destroy(): void`                                                        |
| `addDish(std::string name, int dishNumber): void  ` | `Stop(): void`                                                      | `payTips(float tips): void` | `Recollect(): void`                                                      |
| `takeDish(std::string name): int`                   | `IsStop(): bool`                                                    | `getTips(): float`          | `CreateCustomerThreads(std::string name, std::vector<int> wanted): void` |
| `s_table: Table*`                                   | `ThreadMain(void *Object): void`                                    | `s_tb: TipBox*`             | `DestoryCustomerThreads(std::string name): void`                         |
| `m_orders: std::map<std::string, std::vector<int>>` | `GetTotalTips(): float`                                             | `m_tipsMutex: std::mutex`   | `FinishCompletedCustomers(): void`                                       |
| `m_tableMutex: std::mutex`                          | `FinishCallback(): void`                                            | `total: float`              | `orderDish(std::string name, int dishNum): void`                         |
|                                                     | `m_name: std::string`                                               |                             | `deliveryDish(std::string name, int dishNum): void`                      |
|                                                     | `m_order: Order*`                                                   |                             | `OnDishDelivered(std::string name, int dishNum): void`                   |
|                                                     | `m_wanted: std::vector<int>`                                        |                             | `takeDish(std::string name): int`                                        |
|                                                     | `m_ordered: std::vector<int>`                                       |                             | `payTips(float tips): void`                                              |
|                                                     | `m_finished: std::vector<int>`                                      |                             | `totalCustomers = 0: int`                                                |
|                                                     | `m_bStopping: bool`                                                 |                             | `totalDishes = {0}: std::atomic<int>`                                    |
|                                                     | `m_customerMutex: std::mutex`                                       |                             | `s_order: Order*`                                                        |
|                                                     | `m_thread: std::thread*`                                            |                             | `m_customerThreads: std::map<std::string, Customer *> `                  |
|                                                     | `totalTips: float`                                                  |                             | `m_completed: std::map<std::string, std::vector<int>>`                   |
|                                                     |                                                                     |                             | `m_finished: std::vector<std::string>`                                   |
|                                                     |                                                                     |                             | `m_table: Table*`                                                        |
|                                                     |                                                                     |                             | `m_tipbox: TipBox*`                                                      |
|                                                     |                                                                     |                             | `m_orderMutex: std::mutex`                                               |



### Compare and Contrast execution time of the library code between demo application and comparison application

#### The native comparison application execution time
>Our native comparison application is written from C/C++ code and we set the code to loop 40 times and automatically record the results and execution time in the terminal. (Screenshot saved in the data folder)

![Screenshot.1](Pic/lab3-1.jpg "Screenshot.1")
Screenshot.1 The first execution of the native comparison application

#### The demo application execution time
>Our demo application is creating objects based on js calls to C/C++. We set the code to loop 40 times and print the results and execution time of each run in nodeJS, and print the total execution time results of the 40 runs in the terminal. (The screenshot is saved in the data folder
and shows below)

![Screenshot.2](Pic/lab3-2.jpg "Screenshot.2")
Screenshot.2 The execution of the demo application

#### The Total execution time and confidence intervals.
>We import the 40 execution times of the demo application and the native application 40 execution times into Excel sheet2 and sheet1 respectively, and show confidence intervals for execution time at 95% confidence interval in the table interval.(The Excel sheet is saved in the data folder)

#### Discussion
>Because we don’t know whether the obtained code execution time data conforms to the normal distribution, we enter the execution time data into the Excel table and show the statistic description.
- For the native comparison application results, the 95% confidence interval is <kbd>[0.19037653,0.21742347]</kbd>, the average execution time. Is 0.2039 ms.

![Screenshot.3](Pic/lab3-3.jpg "Screenshot.3")
Screenshot.3 Native execution time and confidence interval

- For the demo application result, the 95% confidence interval is <kbd>[0.71431984,4.91218016]</kbd>, the average execution time is 2.81325 ms.
>Since the deviation of the data in test case1 was too large, almost tens of times that of the other test case data, this caused the value of MEAN in the data analysis, and also made the final 95% confidence interval range too large. This problem only occurs with NodeJS and does not occur inside native codebase.

![Screenshot.4](Pic/lab3-4.jpg "Screenshot.4")
Screenshot.4 NodeJS execution time and confidence interval

>Extra: I guessed that the extreme time overrun of NodeJS test case1 might be related to the fact that js loads some resources when it first runs, So I tried to add a lock to the main function to lock at the beginning of each loop and unlock after the loop finishes. Also, in the deliveryDish method of the order class, after determining that the delivered dish is found, a lock is added and then unlocked after the data related to the dish is changed.
The purpose is to prevent conflicts between one loop and another., but unfortunately it seemed to have limited effect in MacOS Unix(Screenshot shows below). Then I tried to change my code execution environment from Mac Unix to Windows, and the value of test case1 was greatly improved, no longer dozens of times larger than the value of other test cases. (Improved code saved in ‘Code_improved folder’)

![Screenshot.5](Pic/lab3-5.jpg "Screenshot.5")
Screenshot.5 Improved NodeJS execution time and confidence in MacOS

![Screenshot.6](Pic/lab3-6.jpg "Screenshot.6")
Screenshot.6 Improved NodeJS execution time and confidence in Windows

> Compilation instructions:
>- Native C++ code :
>   - `clang++ -pthread -std=c++14 *.cpp -o main`
>- Emsctripten:
>   - `emcc -std=c++14 -pthread -s PROXY_TO_PTHREAD -s ALLOW_MEMORY_GROWTH=1 -s  O_DISABLE_EXCEPTION_CATCHING -s LLD_REPORT_UNDEFINED -s ERROR_ON_UNDEFINED_SYMBOLS=1 main.cpp Order.cpp Customer.cpp Table.cpp TipBox.cpp -o main.html`
>- NodeJS:
>   - `node --experimental-wasm-threads main.js`

### ***[Download](https://github.com/Yvonhu/repo/tree/main/Lab3)***

### ***Back to [Home](https://xinghuadong.github.io/blog.github.io/)***