---
icon: edit
date: 2023-01-05
order: 1
author: AiYin
star: 10
category:
  - 技术
  - 后端
tag:
  - java
---

# java的基础概念

## java基本概念待补充


## 集合

本节里面的图使用的是UML图，可以通过知乎上的一篇文章（[30分钟学会UML](https://zhuanlan.zhihu.com/p/109655171)）对UML有一个了解。

其中关系图如下：
图片暂缺

### 集合框架
图片暂缺

Java 集合框架主要包括两种类型的容器，一种是集合（Collelection），存储一个元素集合，另一种是图（Map），存储键/值对映射。Collection 接口又有 3 种子类型，List、Set 和 Queue，再下面是一些抽象类，最后是具体实现类，常用的有 ArrayList、LinkedList、HashSet、LinkedHashSet、HashMap、LinkedHashMap 等等。

Java 集合框架中还有一个接口是迭代器接口，Collelections实现了这个接口。所以整个集合的所有实现类都可以通过迭代器进行访问。

### 迭代器Iterator

Iterator 接口提供遍历任何 Collection 的接口。我们可以从一个 Collection 中使用迭代器方法来获取迭代器实例。迭代器取代了 Java 集合框架中的 Enumeration，迭代器允许调用者在迭代过程中移除元素。

**Iterator 的使用**

```java
List<String> list = new ArrayList<>();
Iterator<String> it = list. iterator();
while(it. hasNext()){
  String obj = it. next();
  System. out. println(obj);
}
```

Iterator 的特点是只能单向遍历，但是更加安全，因为它可以确保，在当前遍历的集合元素被更改的时候，就会抛出 ConcurrentModificationException 异常。

一种最常见的**错误**代码如下：

```java
for(Integer i : list){
   list.remove(i)
}
```

运行以上错误代码会报 ConcurrentModificationException 异常。这是因为当使用 foreach(for(Integer i : list)) 语句时，会自动生成一个iterator 来遍历该 list，但同时该 list 正在被 Iterator.remove() 修改。Java 一般不允许一个线程在遍历 Collection 时另一个线程修改它。

边遍历边修改 Collection 的唯一正确方式是使用 Iterator.remove() 方法，如下：

```java
Iterator<Integer> it = list.iterator();
while(it.hasNext()){
   *// do something*
   it.remove();
}
```

#### Iterator 和 ListIterator

+ Iterator 可以遍历 Set 和 List 集合，而 ListIterator 只能遍历 List。
+ Iterator 只能单向遍历，而 ListIterator 可以双向遍历（向前/后遍历）。

+ ListIterator 实现 Iterator 接口，然后添加了一些额外的功能，比如添加一个元素、替换一个元素、获取前面或后面元素的索引位置。

### Collelection

图片暂缺

Collection集合的子接口有Set、List、Queue三种子接口，其中Queue是队列，不详细介绍。

+ List：一个有序（元素存入集合的顺序和取出的顺序一致）容器，元素可以重复，可以插入多个null元素，元素都有索引。常用的实现类有 ArrayList、LinkedList 和 Vector。
+ Set：一个无序（存入和取出顺序有可能不一致）容器，不可以存储重复元素，只允许存入一个null元素，必须保证元素唯一性。Set 接口常用实现类是 HashSet、LinkedHashSet 以及 TreeSet。

#### List

list中实现类主要有三个，分别是Arraylist、Vector和LinkedList

##### RandomAccess 接口

Java Collections 框架中提供了一个 RandomAccess 接口，用来标记 List 实现是否支持 Random Access。

+ 如果一个数据集合实现了该接口，就意味着它支持 Random Access，按位置读取元素的平均时间复杂度为 O(1)，如ArrayList。
+ 如果没有实现该接口，表示不支持 Random Access，如LinkedList。

##### Arraylist

ArrayList 类是一个可以动态修改的数组，与普通数组的区别就是它是没有固定大小的限制。

ArrayList底层是通过使用一个object数组实现的，elementData[]是实际存储数据的数组

在内部数组空间不够时，会发生扩容，扩容后是原来容量的1.5倍

```java
int newCapacity = oldCapacity + (oldCapacity >> 1);//新的数组容量=老的数组长度的1.5倍。oldCapacity >> 1 相当于除以2
```

ArrayList的优点如下：

- ArrayList 底层以数组实现，是一种随机访问模式。ArrayList 实现了 RandomAccess 接口，因此查找的时候非常快。
- ArrayList 在顺序添加一个元素的时候非常方便。

ArrayList 的缺点如下：

- 删除元素的时候，需要做一次元素复制操作。如果要复制的元素很多，那么就会比较耗费性能。
- 插入元素的时候，也需要做一次元素复制操作，缺点同上。

ArrayList 不是线程安全的，如果遇到多线程场景，可以通过 Collections 的 synchronizedList 方法将其转换成线程安全的容器后再使用。

##### Vector

Vector底层也是动态数组实现的，同样是实现了List接口，和Arraylist最大的差别是Vector是线程同步的，但是效率较低，基本已经不怎么使用了。

**与Arraylist的区别**

+ 线程安全：Vector 使用了 Synchronized 来实现线程同步，是线程安全的，而 ArrayList 是非线程安全的。
+ 性能：ArrayList 在性能方面要优于 Vector。
+ 扩容：ArrayList 和 Vector 都会根据实际的需要动态的调整容量，只不过在 Vector 扩容每次会增加 1 倍，而 ArrayList 只会增加 50%。

##### LinkedList

LinkedList底层实现方式是双向链表，一个双向链表的节点有三个整数值: 数值、向后的节点链接、向前的节点链接。

<img src="C:\Users\80307331\Desktop\books\10-精简知识\尝试整合\LinkedList.png" alt="img" style="zoom:67%;" />

LinkedList 实现了 Queue、List、Deque、Cloneable 接口，可作为队列、列表的相关操作，同时可实现克隆。

**与ArrayList的区别**

+ 数据结构实现：ArrayList 是动态数组的数据结构实现，而 LinkedList 是双向链表的数据结构实现。
+ 随机访问效率：ArrayList 比 LinkedList 在随机访问的时候效率要高，因为 LinkedList 是线性的数据存储方式，所以需要移动指针从前往后依次查找。
+ 增加和删除效率：在非首尾的增加和删除操作，LinkedList 要比 ArrayList 效率要高，因为 ArrayList 增删操作要影响数组内的其他数据的下标。
+ 内存空间占用：LinkedList 比 ArrayList 更占内存，因为 LinkedList 的节点除了存储数据，还存储了两个引用，一个指向前一个元素，一个指向后一个元素。
+ 线程安全：ArrayList 和 LinkedList 都是不同步的，也就是不保证线程安全；

综合来说，在需要频繁读取集合中的元素时，更推荐使用 ArrayList，而在插入和删除操作较多时，更推荐使用 LinkedList。

##### List 常用的三个实现总结

ArrayList、Vector 底层的实现都是使用数组方式存储数据。数组元素数大于实际存储的数据以便增加和插入元素，它们都允许直接按序号索引元素，但是插入元素要涉及数组元素移动等内存操作，所以索引数据快而插入数据慢。

Vector 中的方法由于加了 synchronized 修饰，因此 Vector 是线程安全容器，但性能上较ArrayList差。

LinkedList 使用双向链表实现存储，按序号索引数据需要进行前向或后向遍历，但插入数据时只需要记录当前项的前后项即可，所以 LinkedList 插入速度较快。

#### Set

+ HashSet（无序，唯一）：基于 HashMap 实现的，底层采用 HashMap 来保存元素
+ LinkedHashSet： LinkedHashSet 继承HashSet，并且其内部是通过 LinkedHashMap 来实现的。
+ TreeSet（有序，唯一）： 红黑树(自平衡的排序二叉树).

##### HashSet

- HashSet 基于 HashMap 来实现的，是一个不允许有重复元素的集合。
- HashSet 允许有 null 值。
- HashSet 是无序的，即不会记录插入的顺序。
- HashSet 不是线程安全的， 如果多个线程尝试同时修改 HashSet，则最终结果是不确定的。 您必须在多线程访问时显式同步对 HashSet 的并发访问。

向HashSet 中add ()元素时，判断元素是否存在的依据，不仅要比较hash值，同时还要结合equles 方法比较。
HashSet 中的add ()方法会使用HashMap 的put()方法。

HashMap 的 key 是唯一的，由源码可以看出 HashSet 添加进去的值就是作为HashMap 的key，并且在HashMap中如果K/V相同时，会用新的V覆盖掉旧的V，然后返回旧的V。所以不会重复（ HashMap 比较key是否相等是先比较hashcode 再比较equals ）。

HashSet有一个全局唯一的PRESENT指向的Object对象，add的时候使用其作为map的value。不使用null作为value的原因是底层map的put和remove方法在判断是否有值时，如果遇到没有关联的值则会返回null（有关联的值则返回关联值，导致不论如何都返回null），造成HashSet的add()和remove()返回值错误。具体代码如下:

```java
public boolean add(E e) {
        return map.put(e, PRESENT)==null;
    }

public boolean remove(Object o) {
        return map.remove(o)==PRESENT;
    }
```

##### LinkedHashSet

LinkedHashSet底层是使用LinkedHashMap，相对于HashMap，多了双向链表的功能，即每个节点包含前一个节点和后一个节点的地址，同时值是一个Hashmap型的Key-Value。

LinkedHashSet是Set集合的一个实现，具有set集合不重复的特点，同时具有可预测的迭代顺序，也就是我们插入的顺序。

并且linkedHashSet是一个非线程安全的集合。

##### TreeSet

+ TreeSet 是一个有序的集合，它的作用是提供有序的Set集合。

+ TreeSet是基于TreeMap实现的。TreeSet中的元素支持2种排序方式：自然排序 或者 根据创建TreeSet 时提供的 Comparator 进行排序。这取决于使用的构造方法。
+ TreeSet为基本操作（add、remove 和 contains）提供受保证的 log(n) 时间开销。
+ TreeSet是非同步的。 它的iterator方法返回的迭代器是fail-fast的。

##### Set常用三种实现类的总结

HashSet使用哈希表实现的，元素是无序的。添加、删除操作时间复杂度都是O(1)。

TreeSet内部结构是一个树结构(红黑树)，元素是有序的，添加、删除操作时间复杂度为O(log(n))，并且提供了first(), last(), headSet(), tailSet()等方法来处理有序集合。

LinkedHashSet是介于HashSet 和 TreeSet之间，内部是一个双向链表结构，所以它的插入是有序的，时间复杂度是O(1)。

简而言之,如何你需要的是一个快速的集合，建议你使用HashSet，如果你需要的是一个排序集合，请选择TreeSet，如果你需要一套能够存储插入顺序的集合,请使用LinkedHashSet。

其中插入速度，HashSet最快，LinkedHashSet次之，TreeSet是最慢的（红黑树需要平衡）。

三种Set类型都是非同步的，在并发情况下需要加同步设置。在JDK8中提供了ConcurrentHashSet这一集合，是线程安全的。

### Map

图片暂缺

#### HashMap

上一节中的HashSet使用的是HashMap实现的，只是将Value置成一个统一的值没有使用。

##### HashMap

HashMap概述： HashMap是基于哈希表的Map接口的非同步实现。此实现提供所有可选的映射操作，并允许使用null值和null键。此类不保证映射的顺序，特别是它不保证该顺序恒久不变。

HashMap 基于 Hash 算法实现的

1. 当我们往Hashmap中put元素时，利用key的hashCode重新hash计算出当前对象的元素在数组中的下标
2. 存储时，如果出现hash值相同的key，此时有两种情况。(1)如果key相同，则覆盖原始值；(2)如果key不同（出现冲突），则将当前的key-value放入链表中
3. 获取时，直接找到hash值对应的下标，在进一步判断key是否相同，从而找到对应值。
4. 理解了以上过程就不难明白HashMap是如何解决hash冲突的问题，核心就是使用了数组的存储方式，然后将冲突的key的对象放入链表中，一旦发现冲突就在链表中做进一步的对比。

需要注意Jdk 1.8中对HashMap的实现做了优化，当链表中的节点数据超过八个之后，该链表会转为红黑树来提高查询效率，从原来的O(n)到O(logn)

##### HashMap 与 HashTable

+ 线程安全： HashMap 是非线程安全的，HashTable 是线程安全的；HashTable 内部的方法基本都经过 synchronized 修饰。（如果要保证线程安全就使用 ConcurrentHashMap ）；
+ 效率： 因为线程安全的问题，HashMap 要比 HashTable 效率高一点。另外，HashTable 基本被淘汰，不要在代码中使用它；
+ 对Null key 和Null value的支持： HashMap 中，null 可以作为键，这样的键只有一个，可以有一个或多个键所对应的值为 null。但是在 HashTable 中 put 进的键值只要有一个 null，直接抛NullPointerException。
+ **初始容量大小和每次扩充容量大小的不同 **： ①创建时如果不指定容量初始值，Hashtable 默认的初始大小为11，之后每次扩充，容量变为原来的2n+1。HashMap 默认的初始化大小为16。之后每次扩充，容量变为原来的2倍。②创建时如果给定了容量初始值，那么 Hashtable 会直接使用你给定的大小，而 HashMap 会将其扩充为2的幂次方大小。也就是说 HashMap 总是使用2的幂作为哈希表的大小，后面会介绍到为什么是2的幂次方。
+ 底层数据结构： JDK1.8 以后的 HashMap 在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为8）时，将链表转化为红黑树，以减少搜索时间。Hashtable 没有这样的机制。
+ 推荐使用：在 Hashtable 的类注释可以看到，Hashtable 是保留类不建议使用，推荐在单线程环境下使用 HashMap 替代，如果需要多线程使用则用 ConcurrentHashMap 替代。

##### HashMap和ConcurrentHashMap

+ （JDK1.7和1.8的ConcurrentHashMap的区别较大，建议单独查看）ConcurrentHashMap对整个桶数组进行了分割分段(Segment)，然后在每一个分段上都用lock锁进行保护，相对于HashTable的synchronized锁的粒度更精细了一些，并发性能更好，而HashMap没有锁机制，不是线程安全的。（JDK1.8之后ConcurrentHashMap启用了一种全新的方式实现,利用CAS算法。）
+ HashMap的键值对允许有null，但是ConCurrentHashMap都不允许。

> ConcurrentHashMap 底层具体实现
> **JDK1.7**
>
> 首先将数据分为一段一段的存储，然后给每一段数据配一把锁，当一个线程占用锁访问其中一个段数据时，其他段的数据也能被其他线程访问。
>
> 在JDK1.7中，ConcurrentHashMap采用Segment + HashEntry的方式进行实现，结构如下：
>
> 一个 ConcurrentHashMap 里包含一个 Segment 数组。Segment 的结构和HashMap类似，是一种数组和链表结构，一个 Segment 包含一个 HashEntry 数组，每个 HashEntry 是一个链表结构的元素，每个 Segment 守护着一个HashEntry数组里的元素，当对 HashEntry 数组的数据进行修改时，必须首先获得对应的 Segment的锁。
>
> ![img](C:\Users\80307331\Desktop\books\10-精简知识\尝试整合\CocurrentHashMap1.7,png)
>
> + 该类包含两个静态内部类 HashEntry 和 Segment ；前者用来封装映射表的键值对，后者用来充当锁的角色；
> + Segment 是一种可重入的锁 ReentrantLock，每个 Segment 守护一个HashEntry 数组里得元素，当对 HashEntry 数组的数据进行修改时，必须首先获得对应的 Segment 锁。
>
> **JDK1.8**
>
> 在JDK1.8中，放弃了Segment臃肿的设计，取而代之的是采用Node + CAS + Synchronized来保证并发安全进行实现，synchronized只锁定当前链表或红黑二叉树的首节点，这样只要hash不冲突，就不会产生并发，效率又提升N倍。
>
> 结构如下：
>
> ![img](C:\Users\80307331\Desktop\books\10-精简知识\尝试整合\CocurrentHashMap1.8,png)
>
>
>

#### LinkedHashMap

LinkedHashMap是将HashMap和双向链表结合在了一起。即每个节点包含前一个节点和后一个节点的地址，同时值是一个Hashmap型的Key-Value。

下面是LinkedHashMap的结构图。使用的不是特别多，如果你想要一个能存储插入顺序的HashMap，可以考虑，其他就不过多介绍了。

![Linkedhashmap](C:\Users\80307331\Desktop\books\10-精简知识\尝试整合\Linkedhashmap) 


## IO流

### java 中 IO 流

+ 按照流的流向分，可以分为输入流和输出流；
+ 按照操作单元划分，可以划分为字节流和字符流；
+ 按照流的角色划分为节点流和处理流。

#### 输入流和输出流

+ 输入流： 只能从中读取数据，而不能向其写入数据。

+ 输出流：只能向其写入数据，而不能向其读取数据。

+ InputStream/Reader: 所有的输入流的基类，前者是字节输入流，后者是字符输入流。
+ OutputStream/Writer: 所有输出流的基类，前者是字节输出流，后者是字符输出流。

#### 字节流和字符流

字节流和字符流的用法几乎完成全一样，区别在于字节流和字符流所操作的数据单元不同，字节流操作的单元是数据单元是8位的字节，字符流操作的是数据单元为16位的字符。

> 字节流主要是由InputStream和outPutStream作为基类，而字符流则主要有Reader和Writer作为基类。

#### 节点流和处理流

+ 可以从/向一个特定的IO设备（如磁盘，网络）读/写数据的流，称为节点流。节点流也被称为低级流。

+ 处理流则用于对一个已存在的流进行连接和封装，通过封装后的流来实现数据的读/写功能。处理流也被称为高级流。

  处理流可以“嫁接”在任何已存在的流的基础之上，这就允许Java应用程序采用相同的代码，透明的方式来访问不同的输入和输出设备的数据流。

  + 性能的提高：主要以增加缓冲的方式来提供输入和输出的效率。
  + 操作的便捷：处理流可能提供了一系列便捷的方法来一次输入和输出大批量的内容，而不是输入/输出一个或者多个“水滴”。   

#### 常用的流的分类表

| 分类       | 字节输入流               | 字节输出流                | 字符输入流          | 字符输出流          |
| :--------- | :----------------------- | :------------------------ | :------------------ | :------------------ |
| 抽象基类   | InputStream              | OutputStream              | Reader              | Writer              |
| 访问文件   | **FileInputStream**      | **FileOutputStream**      | **FileReader**      | **FileWriter**      |
| 访问数组   | **ByteArrayInputStream** | **ByteArrayOutputStream** | **CharArrayReader** | **CharArrayWriter** |
| 访问管道   | **PipedInputStream**     | **PipedOutputStream**     | **PipedReader**     | **PipedWriter**     |
| 访问字符串 |                          |                           | **StringReader**    | **StringWriter**    |
| 缓冲流     | BufferedInputStream      | BufferedOutputStream      | BufferedReader      | BufferedWriter      |
| 转换流     |                          |                           | InputStreamReader   | OutputStreamWriter  |
| 对象流     | ObjectInputStream        | ObjectOutputStream        |                     |                     |
| 抽象基类   | FilterInputStream        | FilterOutputStream        | FilterReader        | FilterWriter        |
| 打印流     |                          | PrintStream               |                     | PrintWriter         |
| 推回输入流 | PushbackInputStream      |                           | PushbackReader      |                     |
| 特殊流     | DataInputStream          | DataOutputStream          |                     |                     |

> 表中粗体字所标出的类代表节点流，必须直接与指定的物理节点关联。

#### FileInputStream/FileReader的使用

前面说过InputStream和Reader都是抽象类，本身不能创建实例，但它们分别有一个用于读取文件的输入流：FileInputStream和FileReader，它们都是节点流——会直接和指定文件关联。下面程序示范使用FileInputStream和FileReader。

**使用FileInputStream读取文件：**

```java
public class MyClass {
  public  static void main(String[] args)throws IOException{
      FileInputStream fis=null;
      try {
          //创建字节输入流
          fis=new FileInputStream("E:\\learnproject\\Iotest\\lib\\src\\main\\java\\com\\Test.txt");
          //创建一个长度为1024的竹筒
          byte[] b=new byte[1024];  //这里是字节
          //用于保存的实际字节数
          int hasRead=0;
          //使用循环来重复取水的过程
          while((hasRead=fis.read(b))>0){
           //取出字节，进行输出
            System.out.print(new String(b,0,hasRead));
          }
      }catch (IOException e){
        e.printStackTrace();
      }finally {
          fis.close();
      }
  }
}
```

**使用FileReader读取文件：**

```java
public class FileReaderTest {
    public  static void main(String[] args)throws IOException{
        FileReader fis=null;
        try {
            //创建字节输入流
            //内部实现是通过字节流实现的
            fis=new FileReader("E:\\learnproject\\Iotest\\lib\\src\\main\\java\\com\\Test.txt");
            //创建一个长度为1024的竹筒
            char[] b=new char[1024];  //这里是字符
            //用于保存的实际字节数
            int hasRead=0;
            //使用循环来重复取水的过程
            while((hasRead=fis.read(b))>0){
                //取出字符，进行输出
                System.out.print(new String(b,0,hasRead));
            }
        }catch (IOException e){
            e.printStackTrace();
        }finally {
            fis.close();
        }
    }
}
```

FileOutputStream/FileWriter和FileInputStream/FileReader基本一样，就不展示了

#### 缓冲流的使用

BufferedInputStream/BufferedReader, BufferedOutputStream/BufferedWriter对应着字节流和字符流的输入输出。

下面介绍字节缓存流的用法（字符缓存流的用法和字节缓存流一致就不介绍了）：

BufferedInputStream的使用

```java
public class BufferedStreamTest {
    public  static void main(String[] args)throws IOException {
        FileInputStream fis=null;
        FileOutputStream fos=null;
        BufferedInputStream bis=null;
        BufferedOutputStream bos=null;
        try {
            //创建字节输入流
            fis=new FileInputStream("E:\\learnproject\\Iotest\\lib\\src\\main\\java\\com\\Test.txt");
            //创建字节输出流
            fos=new FileOutputStream("E:\\learnproject\\Iotest\\lib\\src\\main\\java\\com\\newTest.txt");
            //创建字节缓存输入流
            bis=new BufferedInputStream(fis);
            //创建字节缓存输出流
            bos=new BufferedOutputStream(fos);

            byte[] b=new byte[1024];
            int hasRead=0;
            //循环从缓存流中读取数据
            while((hasRead=bis.read(b))>0){
                //向缓存流中写入数据，读取多少写入多少
                bos.write(b,0,hasRead);
            }
        }catch (IOException e){
            e.printStackTrace();
        }finally {
            bis.close();
            bos.close();
        }
    }
}
```

> 上面代码中我们使用了缓存流和文件流，但是我们只关闭了缓存流。这个需要注意一下，当我们使用处理流套接到节点流上的使用的时候，只需要关闭最上层的处理就可以了。java会自动帮我们关闭下层的节点流。

#### 转换流的使用（InputStreamReader/OutputStreamWriter）:

 下面以获取键盘输入为例来介绍转换流的用法。java使用System.in代表输入。即键盘输入，但这个标准输入流是InputStream类的实例，使用不太方便，而且键盘输入内容都是文本内容，所以可以使用InputStreamReader将其包装成BufferedReader,利用BufferedReader的readLine()方法可以一次读取一行内容，如下代码所示:

```java
public class InputStreamReaderTest {
    public  static void main(String[] args)throws IOException {
        try {
            // 将System.in对象转化为Reader对象
            InputStreamReader reader=new InputStreamReader(System.in);
            //将普通的Reader包装成BufferedReader
            BufferedReader bufferedReader=new BufferedReader(reader);
           String buffer=null;
           while ((buffer=bufferedReader.readLine())!=null){
            // 如果读取到的字符串为“exit”,则程序退出
               if(buffer.equals("exit")){
                   System.exit(1);
               }
               //打印读取的内容
               System.out.print("输入内容："+buffer);
           }
        }catch (IOException e){
            e.printStackTrace();
        }finally {
        }
    }
}
```

上面程序将System.in包装成BufferedReader,BufferedReader流具有缓存功能，它可以一次读取一行文本——以换行符为标志，如果它没有读到换行符，则程序堵塞。等到读到换行符为止。运行上面程序可以发现这个特征，当我们在控制台执行输入时，只有按下回车键，程序才会打印出刚刚输入的内容。

#### 对象流的使用（ObjectInputStream/ObjectOutputStream）的使用：

**写入对象：**

```java
public static void writeObject(){
        OutputStream outputStream=null;
        BufferedOutputStream buf=null;
        ObjectOutputStream obj=null;
        try {
            //序列化文件輸出流
            outputStream=new   FileOutputStream("E:\\learnproject\\Iotest\\lib\\src\\main\\java\\com\\myfile.tmp");
            //构建缓冲流
            buf=new BufferedOutputStream(outputStream);
            //构建字符输出的对象流
            obj=new ObjectOutputStream(buf);
            //序列化数据写入
            obj.writeObject(new Person("A", 21));//Person对象
            //关闭流
            obj.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

**读取对象：**

```java
public static void readObject() throws IOException {
        try {
            InputStream inputStream=new FileInputStream("E:\\learnproject\\Iotest\\lib\\src\\main\\java\\com\\myfile.tmp");
            //构建缓冲流
            BufferedInputStream buf=new BufferedInputStream(inputStream);
            //构建字符输入的对象流
            ObjectInputStream obj=new ObjectInputStream(buf);
            Person tempPerson=(Person)obj.readObject();
            System.out.println("Person对象为："+tempPerson);
            //关闭流
            obj.close();
            buf.close();
            inputStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
```

一些注意事项
1.读取顺序和写入顺序一定要一致，不然会读取出错。
2.在对象属性前面加transient关键字，则该对象的属性不会被序列化。

### NIO和IO（简略）

    我们使用InputStream从输入流中读取数据时，如果没有读取到有效的数据，程序将在此处阻塞该线程的执行。其实传统的输入里和输出流都是阻塞式的进行输入和输出。 不仅如此，传统的输入流、输出流都是通过字节的移动来处理的（即使我们不直接处理字节流，但底层实现还是依赖于字节处理），也就是说，面向流的输入和输出一次只能处理一个字节，因此面向流的输入和输出系统效率通常不高。
    从JDk1.4开始，java提供了一系列改进的输入和输出处理的新功能，这些功能被统称为新IO(NIO)。新增了许多用于处理输入和输出的类，这些类都被放在java.nio包及其子包下，并且对原io的很多类都以NIO为基础进行了改写。新增了满足NIO的功能。
    NIO采用了内存映射对象的方式来处理输入和输出，NIO将文件或者文件的一块区域映射到内存中，这样就可以像访问内存一样来访问文件了。通过这种方式来进行输入/输出比传统的输入和输出要快的多。

### 文件操作

**Files的常用方法**

- Files. exists()：检测文件路径是否存在。
- Files. createFile()：创建文件。
- Files. createDirectory()：创建文件夹。
- Files. delete()：删除一个文件或目录。
- Files. copy()：复制文件。
- Files. move()：移动文件。
- Files. size()：查看文件个数。
- Files. read()：读取文件。
- Files. write()：写入文件。
