---
icon: edit
date: 2022-01-05
category:
  - 技术
  - K8s
tag:
  - 翻译
---

# K8S模式

## 1.Introduction

## 1. 简介

In this introductory chapter, we set the scene for the rest of the book by explaining a few of the core Kubernetes concepts used for designing and implementing container basedcloud-native applications. Understanding these new abstractions, and the related principles and patterns from this book, are key to building distributed applications made automatable by cloud-native platforms.
This chapter is not a prerequisite for understanding the patterns described later.Readers familiar with Kubernetes concepts can skip it and jump straight into the pattern category of interest.

在本介绍性章节中，我们通过解释一些Kubernetes的核心概念，这些概念用于设计和实现基于容器的云原生应用，为本书的其余部分奠定了基础。理解这些新的抽象，以及本书中的相关原则和模式，是使用云原生平台自动化构建分布式应用程序的关键。

本章不是理解后面章节设计模式的先决条件。熟悉Kubernetes概念的读者可以跳过本章，直接阅读感兴趣的章节。

### 1.1 The Path to Cloud Native

### 1.1 通往云原生的道路

The most popular application architecture on the cloud-native platforms such as Kubernetes is the microservices style. This software development technique tackles software complexity through modularization of business capabilities and trading development complexity for operational complexity.

Kubernetes等云原生平台上最流行的应用程序架构是微服务风格的。这种微服务风格软件开发技术通过以下两个方法来解决软件复杂性问题

- 将业务内容进行模块化
- 使用开发上的复杂性换取操作复杂性

As part of the microservices movement, there is a significant amount of theory and supplemental techniques for creating microservices from scratch or for splitting monoliths into microservices. Most of these practices are based on the Domain-Driven Design book by Eric Evans (Addison-Wesley) and the concepts of bounded contexts and aggregates. Bounded contexts deal with large models by dividing them into different components, and aggregates help further to group bounded contexts into modules with defined transaction boundaries.

However, in addition to these business domain considerations, for every distributed system—whether it is based on microservices or not—there are also numerous technical concerns around its organization,structure, and runtime behavior.

作为微服务运动的一部分，有大量的理论和补充技术用于从头开始创建微服务或将整体应用拆分为微服务。这些实践大多基于Eric Evans（Addison Wesley）的领域驱动设计书以及有界（限界）上下文和聚合的概念。有界上下文通过将大型模型划分为不同的组件来处理大型模型，聚合有助于进一步将有界上下文分组为具有定义事务边界的模块。

然而，除了这些业务领域的考虑之外，对于每个分布式系统，无论它是否基于微服务，它的组织、结构和运行时行为也有许多技术问题。

Containers and container orchestrators such as Kubernetes provide many new primitives and abstractions to address the concerns of distributed applications, and here we discuss the various options to consider when putting a distributed system into Kubernetes.

Kubernetes等容器和容器调度器提供了许多新的原语（原型）和抽象来解决分布式应用程序的问题，在这里，我们讨论使用Kubernetes创建分布式系统时要考虑的各种因素。

Throughout this book, we look at container and platform interactions by treating the containers as black boxes. However, we created this section to emphasize the importance of what goes into containers. Containers and cloud-native platforms bring tremendous benefits to your distributed applications, but if all you put into containers is rubbish, you will get distributed rubbish at scale. Figure 1-1 shows the mixture of the skills required for creating good cloud-native applications.

在本书中，我们通过将容器视为黑匣子来研究容器和平台的交互。然而，我们创建本节是为了强调关于容器内容的重要性。容器和云原生平台在为分布式应用程序带来了巨大的好处，但是如果容器中投入的只是垃圾，那么将得到的是大规模的分布式垃圾。图1-1显示了创建良好的云原生应用程序所需的技能组合。![image.png](https://cdn.nlark.com/yuque/0/2021/png/2466332/1633507758982-111d5750-675f-4ff9-a68c-b51e2523ccfe.png#clientId=u6d5596df-caa0-4&from=paste&height=545&id=u2ed8fcfe&margin=%5Bobject%20Object%5D&name=image.png&originHeight=545&originWidth=650&originalType=binary&ratio=1&size=55989&status=done&style=none&taskId=u13e3b312-7d16-49ec-8203-0d4b7b6f047&width=650)
Figure 1-1. The path to cloud native

At a high level, there are multiple abstraction levels in a cloud-native application that require different design considerations:

从最高层来看，云原生应用程序中有多个抽象级别，不同的抽象层级需要不同的设计考虑：

- At the lowest code level, every variable you define, every method you create, and every class you decide to instantiate plays a role in the long-term maintenance of
  the application. No matter what container technology and orchestration platform you use, the development team and the artifacts they create will have the most impact. It is important to grow developers who strive to write clean code, have the right amount of automated tests, constantly refactor to improve code quality, and are software craftsmen at heart.
- 在里层的的代码级别上，你定义的每个变量、创建的每个方法以及你决定实例化的每个类都在应用程序的长期维护中发挥作用。无论你使用何种容器技术和编排平台，开发团队和他们创建的组件都将产生最大的影响。重要的是要培养那些努力编写干净代码、拥有适当数量的自动化测试、不断重构以提高代码质量、并且内心是软件工匠的开发人员。
- Domain-Driven Design is about approaching software design from a business perspective with the intention of keeping the architecture as close to the real world as possible. This approach works best for object-oriented programming languages, but there are also other good ways to model and design software for real-world problems. A model with the right business and transaction boundaries, easy-to-consume interfaces, and rich APIs is the foundation for successful containerization and automation later.
- 领域驱动设计是从业务的角度进行软件设计，目的是使体系结构尽可能接近真实世界。这种方法最适用于面向对象编程语言，但也有其他很好的方法可以为实际问题建模和设计软件。具有正确的业务和事务边界、易于使用接口和丰富API的模型是以后成功的容器化和自动化的基础。
- The microservices architectural style very quickly evolved to become the norm,and it provides valuable principles and practices for designing changing distributed applications. Applying these principles lets you create implementations that are optimized for scale, resiliency, and pace of change, which are common requirements for any modern software today.
- 微服务体系架构风格很快发展成为规范，它为设计不断变化的分布式应用程序提供了有价值的原则和实践。应用这些原则，你可以创建易于扩展、具有弹性和适应快速变化的分布式软件，这是当今任何现代软件的常见需求。
- Containers were very quickly adopted as the standard way of packaging and running distributed applications. Creating modular, reusable containers that are good cloud-native citizens is another fundamental prerequisite. With a growing
  number of containers in every organization comes the need to manage them using more effective methods and tools. Cloud native is a relatively new term used to describe principles, patterns, and tools to automate containerized microservices at scale. We use cloud native interchangeably with Kubernetes, which is the most popular open source cloud-native platform available today.
- 容器很快成为打包和运行分布式应用程序的标准方式。创建模块化、可重用的容器，使其成为优秀的云原生公民，这是另一个基本前提。随着每个组织中容器数量的不断增加，需要使用更有效的方法和工具来管理它们。云原生是一个相对较新的术语，用于描述大规模自动化容器化微服务的原则、模式和工具。我们将云原生与Kubernetes互换使用，Kubernetes是目前最流行的开源云原生平台。

In this book, we are not covering clean code, domain-driven design, or microservices.We are focusing only on the patterns and practices addressing the concerns of the container orchestration. But for these patterns to be effective, your application needs to be designed well from the inside by applying clean code practices, domain-driven design, microservices patterns, and other relevant design techniques.

在本书中，我们不涉及干净的代码、领域驱动设计或微服务，我们只关注解决容器编排问题的模式和实践。但是为了使这些模式有效，你的应用程序需要通过应用干净的代码实践、领域驱动设计、微服务模式和其他相关设计技术从内部进行良好设计。

### 1.2 Distributed Primitives

### 1.2 分布式原语

<!--百度百科中原语的定义：所谓原语，一般是指由若干条指令组成的程序段，用来实现某个特定功能，在执行过程中不可被中断。在操作系统中，某些被进程调用的操作，如队列操作、对信号量的操作、检查启动外设操作等，一旦开始执行，就不能被中断，否则就会出现操作错误，造成系统混乱。所以，这些操作都要用原语来实现 原语是操作系统核心（不是由进程，而是由一组程序模块组成）的一个组成部分，并且常驻内存，通常在管态下执行。原语一旦开始执行，就要连续执行完，不允许中断 。-->

<!--进程内原语与分布式原语有一些共性，但它们之间不具有直接的可比性。它们运行在不同的抽象层之上，有不同的前提条件，并提供了不一样的保证。所以这里的分布式原语只是一种类比行为，并不是指分布式原语等于进程中的原语-->

To explain what we mean by new abstractions and primitives, here we compare them with the well-known object-oriented programming (OOP), and Java specifically. In the OOP universe, we have concepts such as class, object, package, inheritance,encapsulation, and polymorphism. Then the Java runtime provides specific features and guarantees on how it manages the lifecycle of our objects and the application as a whole.

为了解释新的抽象概念和原语的含义，这里我们将它们与著名的面向对象编程（OOP）和Java进行比较。在OOP领域中，我们有类、对象、包、继承、封装和多态性等概念。然后，Java运行时就如何管理对象和整个应用程序的生命周期提供了特定的功能和保证。

The Java language and the Java Virtual Machine (JVM) provide local, in-process building blocks for creating applications. Kubernetes adds an entirely new dimension to this well-known mindset by offering a new set of distributed primitives and runtime for building distributed systems that spread across multiple nodes and processes.With Kubernetes at hand, we don’t rely only on the local primitives to implement the whole application behavior.

Java语言和Java虚拟机（JVM）为创建应用程序提供了本地的进程内构建块。Kubernetes通过提供一组新的分布式原语和运行时来构建分布在多个节点和进程上的分布式系统，为这种众所周知的思维方式增加了一个全新的维度。有了Kubernetes，我们不再仅仅依靠本地原语来实现整个应用程序行为。

We still need to use the object-oriented building blocks to create the components of the distributed application, but we can also use Kubernetes primitives for some of the application behaviors. Table 1-1 shows how various development concepts are realized differently with local and distributed primitives.

我们仍然需要使用面向对象的构建块来创建分布式应用程序的组件，但是我们也可以对一些应用程序行为使用Kubernetes原语。表1-1显示了如何使用本地和分布式原语以不同方式实现各种开发概念。

Table 1-1. Local and distributed primitives

| Concept                           | Local primitive                  | Distributed primitive           |
| --------------------------------- | -------------------------------- | ------------------------------- |
| Behavior encapsulation            | Class                            | Container image                 |
| Behavior instance                 | Object                           | Container                       |
| Unit of reuse                     | .jar                             | Container image                 |
| Composition                       | Class A contains Class B         | Sidecar pattern                 |
| Inheritance                       | Class A extends Class B          | A container’s FROM parent image |
| Deployment unit                   | .jar/.war/.ear                   | Pod                             |
| Buildtime/Runtime isolation       | Module, Package, Class           | Namespace, Pod, container       |
| Initialization preconditions      | Constructor                      | Init container                  |
| Postinitialization trigger        | Init-method                      | postStart                       |
| Predestroy trigger                | Destroy-method                   | preStop                         |
| Cleanup procedure                 | finalize(), shutdown hook        | Defer containera                |
| Asynchronous & parallel execution | ThreadPoolExecutor, ForkJoinPool | Job                             |
| Periodic task                     | Timer, ScheduledExecutorService  | CronJob                         |
| Background task                   | Daemon thread                    | DaemonSet                       |
| Configuration management          | System.getenv(), Properties      | ConfigMap, Secret               |

这个表格内容理解较容易，暂时不翻译。

The in-process primitives and the distributed primitives have commonalities, but they are not directly comparable and replaceable. They operate at different abstraction levels and have different preconditions and guarantees. Some primitives are supposed to be used together. For example, we still have to use classes to create objects and put them into container images. However, some other primitives such as Cron‐Job in Kubernetes can replace the ExecutorService behavior in Java completely.

进程内原语和分布式原语具有共性，但它们不能直接进行比较和替换。它们在不同的抽象层级上运行，并具有不同的前提条件和保证。一些原语应该一起使用，例如，我们仍然必须使用类来创建对象并将它们放入容器图像中。但是，Kubernetes中的Cron-Job等其他原语可以完全替代Java中的ExecutorService行为。

Next, let’s see a few distributed abstractions and primitives from Kubernetes that are especially interesting for application developers.

接下来，让我们看看Kubernetes的一些分布式抽象和原语，它们对应用程序开发人员来说特别有趣。

#### 1.2.1 Containers

#### 1.2.1 容器

Containers are the building blocks for Kubernetes-based cloud-native applications. If we make a comparison with OOP and Java, container images are like classes, and containers are like objects.

The same way we can extend classes to reuse and alter behavior, we can have container images that extend other container images to reuse and alter behavior.

The same way we can do object composition and use functionality, we can do container compositions by putting containers into a Pod and using collaborating containers.

在基于Kubernetes的云原生应用程序中，容器就是构建块。如果我们与OOP和Java进行比较，那么容器镜像对应的是类，容器对应的是对象。

我们可以扩展类来实现类的复用和多态（改变行为），同样的我们可以使用容器镜像来扩展其他容器镜像实现镜像的重用和改变行为。

我们可以用同样的方法进行对象组合和使用功能，我们可以通过将容器放入一个Pod并使用协作容器来进行容器组合。

If we continue the comparison, Kubernetes would be like the JVM but spread over multiple hosts, and would be responsible for running and managing the containers.

如果我们继续比较，Kubernetes将类似于JVM，但分布在多个主机上，并负责运行和管理容器。

Init containers would be something like object constructors;

DaemonSets would be similar to daemon threads that run in the background (like the Java Garbage Collector,for example).

A Pod would be something similar to an Inversion of Control (IoC) context (Spring Framework, for example), where multiple running objects share a managed lifecycle and can access each other directly.

初始化容器类似于对象构造函数；

守护程序集类似于后台运行的守护程序线程（例如Java垃圾收集器）。

Pod类似于控制反转（Inversion of Control，IoC）中的上下文（例如Spring Framework），在该上下文中，多个运行的对象共享一个托管生命周期，并且可以直接访问彼此。

The parallel doesn’t go much further, but the point is that containers play a fundamental role in Kubernetes, and creating modularized, reusable, single-purpose container images is fundamental to the long-term success of any project and even the containers’ ecosystem as a whole. Apart from the technical characteristics of a container image that provide packaging and isolation, what does a container represent and what is its purpose in the context of a distributed application? Here are a few suggestions on how to look at containers:

这种并行的相对性没什么大不了的，但是关键的是容器在Kubernetes中起着的基础性作用，因为创建模块化、可重用、单用途的容器镜像对于任何项目乃至整个容器生态系统的长期成功至关重要。容器镜像除了提供打包和隔离的技术特征外，容器代表什么？在分布式应用程序的上下文中，容器的用途是什么？以下是一些关于如何看待容器的建议：

- A container image is the unit of functionality that addresses a single concern. 
- 容器镜像是解决单个问题的功能单元。 
- A container image is owned by one team and has a release cycle. 
- 容器镜像由一个团队拥有，并且有一个发布周期。 
- A container image is self-contained and defines and carries its runtime dependencies. 
- 容器镜像是自包含的，定义并携带其运行时依赖项。 
- A container image is immutable, and once it is built, it does not change; it is configured. 
- 容器镜像是不可变的，一旦构建，它就不会更改；已经被配置。 
- A container image has defined runtime dependencies and resource requirements. 
- 容器镜像定义了运行时依赖项和资源需求。 
- A container image has well-defined APIs to expose its functionality. 
- 容器镜像具有定义清晰的API用来公开其功能。 
- A container runs typically as a single Unix process. 
- 容器通常作为单个Unix进程运行。 
- A container is disposable and safe to scale up or down at any moment. 
- 容器是易于更新（短暂）的，可以随时放大或缩小。 

In addition to all these characteristics, a proper container image is modular. It is parameterized and created for reuse in the different environments it is going to run. But it is also parameterized for its various use cases.

Having small, modular, and reusable container images leads to the creation of more specialized and stable container images in the long term, similar to a great reusable library in the programming language world.

除了所有这些特性之外，容器镜像也是模块化的。它被参数化并创建，以便在将要运行的不同环境中重用。同时它的参数化也适应各种不同的用例。

拥有小的、模块化的、可重用的容器镜像将会对长期创建更专业、更稳定的容器镜像有帮助，类似于编程语言世界中的大型可重用库。

#### 1.2.2 Pods

#### 1.2.2 Pods（分离舱、不太好翻译，直接使用Pods）

Looking at the characteristics of containers, we can see that they are a perfect match for implementing the microservices principles. A container image provides a single unit of functionality, belongs to a single team, has an independent release cycle, and provides deployment and runtime isolation. Most of the time, one microservice corresponds to one container image.

看完容器的特性，我们可以看到它们和实现微服务原则的完美匹配。容器映像提供单个功能单元，属于单个团队，具有独立的发布周期，并提供部署和运行时隔离。大多数情况下，一个微服务对应一个容器镜像。

However, most cloud-native platforms offer another primitive for managing the lifecycle of a group of containers—in Kubernetes it is called a Pod.

然而，大多数云原生平台提供了另一种原语来管理一组容器的生命周期，在Kubernetes中称为Pod。

A Pod is an atomic unit of scheduling, deployment, and runtime isolation for a group of containers. All containers in a Pod are always scheduled to the same host, deployed together whether for scaling or host migration purposes, and can also share filesystem, networking, and process namespaces. This joint lifecycle allows the containers in a Pod to interact with each other over the filesystem or through networking via localhost or host interprocess communication mechanisms if desired (for performance reasons, for example).

Pod是一组容器的调度、部署和运行时隔离的原子单元。Pod中的所有容器始终调度到同一台主机，都一起部署，无论是为了扩展还是为了主机迁移，并且还可以共享文件系统、网络和进程名称空间。这种联合生命周期允许Pod中的容器通过文件系统或通过本地主机或主机进程间通信机制进行网络交互（例如，出于性能原因）。

As you can see in Figure 1-2, at the development and build time, a microservice corresponds to a container image that one team develops and releases. But at runtime, a microservice is represented by a Pod, which is the unit of deployment, placement, and scaling. The only way to run a container—whether for scale or migration—is through the Pod abstraction.

Sometimes a Pod contains more than one container.One such example is when a containerized microservice uses a helper container at runtime, as Chapter 15, Sidecar demonstrates later.

如图1-2所示，在开发和构建时，每个微服务应用对应着团队开发和发布的一个容器镜像。但在运行时，微服务由一个Pod表示，Pod是部署、放置和扩展的单元。

运行容器（无论是用于扩展还是迁移）的唯一方法是通过Pod实现。有时一个Pod包含多个容器，例如当一个容器化的微服务在运行时使用了一个助手容器，在第15章中，Sidecar就是一个例子。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/2466332/1633507821552-547a5fcd-196c-4c6f-b12b-ab642225d645.png#clientId=u6d5596df-caa0-4&from=paste&height=461&id=u78147ea9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=461&originWidth=710&originalType=binary&ratio=1&size=45186&status=done&style=none&taskId=u56196258-2c18-4beb-b05f-1c0c6c307a9&width=710)
Figure 1-2. A Pod as the deployment and management unit

Containers and Pods and their unique characteristics offer a new set of patterns and principles for designing microservices-based applications. We looked at some of the characteristics of well-designed containers; now let’s look at some of the characteristics of a Pod:

容器和pod及其独特的特性为设计基于微服务的应用程序提供了一套新的模式和原则。我们研究了精心设计的容器的一些特性；现在让我们看一下Pod的一些特性：

- A Pod is the atomic unit of scheduling. That means the scheduler tries to find a host that satisfies the requirements of all containers that belong to the Pod (there are some specifics around init containers, which we cover in Chapter 14, Init Container). If you create a Pod with many containers, the scheduler needs to find a host that has enough resources to satisfy all container demands combined. This scheduling process is described in Chapter 6, Automated Placement.
- Pod是调度的原子单元。这意味着分配资源的时候，调度器试图找到一台主机，这台主机能满足Pod中所有容器的需求（初始化容器有一些细节，我们将在第14章初始化容器中介绍）。如果你创建了一个包含许多容器的Pod，那么调度器需要找到一个有足够资源满足所有容器需求的主机。该调度过程在第6章“自动布局”中描述。（这里感觉重复了？）
- A Pod ensures colocation of containers. Thanks to the colocation, containers in the same Pod have additional means to interact with each other.The most common ways for communication include using a shared local filesystem for exchanging data or using the localhost network interface, or some host interprocess communication (IPC) mechanism for high-performance interactions.
- 一个Pod确保了这个Pod中所有容器在同一台主机。多亏了这种共定位，同一个Pod中的容器有了额外相互作用的方式。最常见的通信方式包括使用共享本地文件系统交换数据，或使用本地主机网络接口，或使用某些主机进程间通信（IPC）机制进行高性能交互。
- A Pod has an IP address, name, and port range that are shared by all containers belonging to it. That means containers in the same Pod have to be carefully configured to avoid port clashes, in the same way that parallel running Unix processes have to take care when sharing the networking space on a host.
- Pod具有IP地址、名称和端口范围，所有属于它的容器都共享这些地址、名称和端口范围。这意味着必须仔细配置同一Pod中的容器以避免端口冲突，就像并行运行的Unix进程在共享主机上的网络空间时必须小心一样。

A Pod is the atom of Kubernetes where your application lives, but you don’t access Pods directly—that is where Services enter the scene.

Pod就像是Kubernetes（云原生平台）上的原子，你的应用程序就运行在上面，但你不能直接访问Pod，但是Pod正是服务的入口。

#### 1.2.3 Services

#### 1.2.3 服务

Pods are ephemeral—they can come and go at any time for all sort of reasons such as scaling up and down, failing container health checks, and node migrations. A Pod IP address is known only after it is scheduled and started on a node. A Pod can be rescheduled to a different node if the existing node it is running on is no longer healthy. All that means is the Pod’s network address may change over the life of an application, and there is a need for another primitive for discovery and load balancing.

POD是短暂的，它们可以在任何时候来来去去（关闭和启动），原因有各种各样，比如弹性伸缩、容器健康检查失败和节点迁移。Pod的IP地址只有在节点上调度和启动后才知道。如果Pod运行的现有节点不再正常，则可以将Pod重新调度到其他节点。这意味着Pod的网络地址可能会在应用程序的生命周期内发生变化，因此需要另一种原语来进行发现和负载平衡。

That’s where the Kubernetes Services come into play. The Service is another simple but powerful Kubernetes abstraction that binds the Service name to an IP address and port number permanently. So a Service represents a named entry point for accessing an application. In the most common scenario, the Service serves as the entry point for a set of Pods, but that might not always be the case. The Service is a generic primitive, and it may also point to functionality provided outside the Kubernetes cluster. As such, the Service primitive can be used for Service discovery and load balancing, and allows altering implementations and scaling without affecting Service consumers. We explain Services in detail in Chapter 12, Service Discovery.

这就是Kubernetes服务发挥作用的地方。该服务是另一个简单但功能强大的Kubernetes抽象，它将服务名称永久绑定到IP地址和端口号。因此，服务代表用于访问应用程序的命名入口点。在最常见的场景中，服务充当一组pod的入口点，但情况可能并非总是如此。该服务是一个通用原语，它还可以指向Kubernetes集群外部提供的功能。因此，服务原语可用于服务发现和负载平衡，并允许在不影响服务使用者的情况下更改实现和扩展。我们将在第12章“服务发现”中详细解释服务。

#### 1.2.4 Labels

#### 1.2.4标签

We have seen that a microservice is a container at build time but represented by a Pod at runtime. So what is an application that consists of multiple microservices? Here,Kubernetes offers two more primitives that can help you define the concept of an application: labels and namespaces. We cover namespaces in detail in “Namespaces” on page 9.

我们已经看到，微服务在构建时是一个容器，但在运行时由一个Pod表示。那么，由多个微服务组成的应用程序是什么呢？在这里，Kubernetes提供了另外两个原语，它们可以帮助您定义应用程序的概念：标签和命名空间。我们将在下一个标题“命名空间”中详细介绍命名空间。

Before microservices, an application corresponded to a single deployment unit with a single versioning scheme and release cycle. There was a single file for an application in the form of a .war, or .ear or some other packaging format. But then, applications got split into microservices, which are independently developed, released, run,restarted,or scaled.With microservices, the notion of an application diminishes, and there are no longer key artifacts or activities that we have to perform at the application level. However, if you still need a way to indicate that some independent services belong to an application, labels can be used. Let’s imagine that we have split one monolithic application into three microservices, and another application into two microservices.

在微服务出现之前，每个应用程序都具有单一版本控制方案和发布周期的单一部署单元。应用程序只有一个文件，格式为.war、或.ear或其他打包格式。但随后，应用程序被拆分为独立开发、发布、运行、可以重新启动或扩展的微服务。有了微服务，应用程序的概念就减少了，我们不再需要在应用程序级别执行关键的构建和任务。但是，如果你仍然需要一种方法来指示某些独立服务属于某个应用程序，则可以使用标签。让我们想象一下，我们已经将一个单片应用程序拆分为三个微服务，将另一个应用程序拆分为两个微服务。

We now have five Pod definitions (and maybe many more Pod instances) that are independent of the development and runtime points of view. However, we may still need to indicate that the first three Pods represent an application and the other two Pods represent another application. Even the Pods may be independent, to provide a business value, but they may depend on each other. For example, one Pod may contain the containers responsible for the frontend, and the other two Pods are responsible for providing the backend functionality. If either of these Pods is down, the application is useless from a business point of view. Using label selectors gives us the ability to query and identify a set of Pods and manage it as one logical unit. Figure 1-3 shows how you can use labels to group the parts of a distributed application into specific subsystems.

我们现在有五个Pod定义（可能还有更多的Pod实例），看上去它们是独立于开发和具有单独的运行时。但是，我们可能仍然需要指出，前三个pod表示一个应用程序，另外两个pod表示另一个应用程序。即使POD也可能是独立的，以提供业务价值，但它们可能相互依赖。例如，一个Pod可能包含负责前端的容器，另外两个Pod负责提供后端功能。如果这些Pod中的任何一个停机，那么从业务角度来看，应用程序是无用的。使用标签选择器使我们能够查询和识别一组POD，并将其作为一个逻辑单元进行管理。图1-3显示了如何使用标签将分布式应用程序的各个部分分组到特定的子系统中。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/2466332/1633507851767-184dafad-a40e-4772-9e75-b246f4239cec.png#clientId=u6d5596df-caa0-4&from=paste&height=718&id=u1ab1c455&margin=%5Bobject%20Object%5D&name=image.png&originHeight=718&originWidth=1154&originalType=binary&ratio=1&size=159503&status=done&style=none&taskId=u9f9067b4-4db1-48b6-aade-28cee0d539a&width=1154)
Figure 1-3. Labels used as an application identity for Pods

Here are a few examples where labels can be useful:

以下是一些标签有用的示例：

- Labels are used by the ReplicaSets to keep some instances of a specific Pod running.That means every Pod definition needs to have a unique combination of labels used for scheduling. 
- 复制集(副本集群)使用标签来确保Pod的某些实例高可用的运行。这意味着每个Pod定义都需要一个用于调度的唯一标签组合。 
- Labels are also used heavily by the scheduler. The scheduler uses labels for colocating or spreading Pods to place Pods on the nodes that satisfy the Pods’ requirements. 
- 调度程序也大量使用标签。调度器使用标签对Pod进行定位或扩展，以将Pod放置在满足Pod需求的节点上。 
- A Label can indicate a logical grouping of set of Pods and give an application identity to them. 
- 标签可以指明一组POD的逻辑分组，并为它们提供应用程序标识。 
- In addition to the preceding typical use cases, labels can be used to store metadata.It may be difficult to predict what a label could be used for, but it is best to have enough labels to describe all important aspects of the Pods. For example,having labels to indicate the logical group of an application, the business characteristics and criticality, the specific runtime platform dependencies such as hardware architecture, or location preferences are all useful.
  Later, these labels can be used by the scheduler for more fine-grained scheduling,or the same labels can be used from the command line for managing the matching Pods at scale. However, you should not go overboard and add too many labels in advance. You can always add them later if needed. Removing labels is much riskier as there is no straight-forward way of finding out what a label is used for,and what unintended effect such an action may cause. 
- 除了前面的典型用例外，标签还可用于存储元数据。可能很难预测标签的用途，但最好有足够的标签来描述POD的所有重要方面。例如，使用标签指示应用程序的逻辑组、业务特征和关键性、特定运行时平台依赖性（如硬件体系结构）或位置首选项都很有用。
  稍后，调度器可以使用这些标签进行更细粒度的调度，也可以从命令行使用相同的标签来按比例管理匹配的POD。但是，你不应该过度使用标签，提前添加太多标签。如果需要，您可以随时稍后添加它们。移除标签的风险更大，因为没有直接的方法来确定标签的用途，以及这样的行为可能导致的意外影响。 

#### 1.2.5 Annotations

#### 1.2.5 注释

Another primitive very similar to labels is called annotations. Like labels, annotations are organized as a map, but they are intended for specifying nonsearchable metadata and for machine usage rather than human.

另一个与标签非常相似的原语称为注释。与标签一样，注释被组织为一个映射，但它们用于指定不可检索的元数据，并属于机器使用，而不是人工使用。

The information on the annotations is not intended for querying and matching objects. Instead, it is intended for attaching additional metadata to objects from various tools and libraries we want to use. Some examples of using annotations include build IDs, release IDs, image information, timestamps, Git branch names, pull request numbers, image hashes, registry addresses, author names, tooling information,and more. So while labels are used primarily for query matching and performing actions on the matching resources, annotations are used to attach metadata that can be consumed by a machine.

注释上的信息不用于查询和匹配对象。相反，它旨在将附加元数据附加到我们想要使用的各种工具和库中的对象。使用注释的一些示例包括构建ID、发布ID、图像信息、时间戳、Git分支名称、请求号、图像哈希、注册表地址、作者姓名、工具信息等。因此，虽然标签主要用于查询匹配和对匹配资源执行操作，但注释用于附加机器可以使用的元数据。

#### 1.2.6 Namespaces

#### 1.2.6 命名空间

Another primitive that can also help in the management of a group of resources is the Kubernetes namespace. As we have described, a namespace may seem similar to a label, but in reality, it is a very different primitive with different characteristics and purpose.

另一个有助于管理一组资源的原语是Kubernetes命名空间。正如我们所描述的，命名空间看起来可能类似于标签，但实际上，它是一个非常不同的原语，具有不同的特征和用途。

Kubernetes namespaces allow dividing a Kubernetes cluster (which is usually spread across multiple hosts) into a logical pool of resources. Namespaces provide scopes for Kubernetes resources and a mechanism to apply authorizations and other policies to a subsection of the cluster. The most common use case of namespaces is representing different software environments such as development, testing, integration testing, or production.

Kubernetes命名空间允许将Kubernetes集群（通常分布在多个主机上）划分为一个逻辑资源池。命名空间为Kubernetes资源提供了作用域，并提供了将授权和其他策略应用于集群子部分的机制。命名空间最常见的用例是表示不同的软件环境，如开发、测试、集成测试或生产环境。

Namespaces can also be used to achieve multitenancy, and provide isolation for team workspaces, projects, and even specific applications. But ultimately, for a greater isolation of certain environments, namespaces are not enough, and having separate clusters is common. Typically, there is one nonproduction Kubernetes cluster used for some environments (development, testing, and integration testing) and another production Kubernetes cluster to represent performance testing and production environments.

命名空间还可用于实现多租户，并为团队工作空间、项目甚至特定应用程序提供隔离。但归根结底，为了更好地隔离某些环境，命名空间是不够的，而拥有独立的集群是很常见的。通常，有一个非生产Kubernetes集群用于某些环境（开发、测试和集成测试），另一个生产Kubernetes集群用于表示性能测试和生产环境。

Let’s see some of the characteristics of namespaces and how they can help us in different scenarios:

让我们看看命名空间的一些特性，以及它们如何在不同的场景中帮助我们：

- A namespace is managed as a Kubernetes resource.
- 命名空间作为Kubernetes资源进行管理。
- A namespace provides scope for resources such as containers, Pods,Services, or ReplicaSets. The names of resources need to be unique within a namespace, but not across them.
- 命名空间为容器、Pod、服务或复制集等资源提供作用域。资源的名称在命名空间内必须是唯一的，但不能跨命名空间。
- By default, namespaces provide scope for resources, but nothing isolates those resources and prevents access from one resource to another. For example, a Pod from a development namespace can access another Pod from a production namespace as long as the Pod IP address is known. However, there are Kubernetes plugins that provide networking isolation to achieve true multitenancy across namespaces if desired.
- 默认情况下，命名空间为资源提供作用域，但没有任何东西可以隔离这些资源并阻止从一个资源到另一个资源的访问。例如，只要Pod IP地址已知，来自开发命名空间的Pod就可以访问来自生产命名空间的另一个Pod。然而，如果需要的话，有一些Kubernetes插件可以提供网络隔离以实现跨名称空间的真正多租户。
- Some other resources such as namespaces themselves, nodes, and PersistentVolumes do not belong to namespaces and should have unique cluster-wide names.
- 其他一些资源（如命名空间本身、节点和PersistentVolume）不属于命名空间，应该具有唯一的群集范围的名称。
- Each Kubernetes Service belongs to a namespace and gets a corresponding DNS address that has the namespace in the form of < service-name >.< namespacename >.svc.cluster.local. So the namespace name is in the URI of every Service belonging to the given namespace. That’s one reason it is vital to name namespaces wisely.
- 每个Kubernetes服务都属于一个命名空间，并获取相应的DNS地址，该地址的命名空间格式为< Service name >< namespacename >.svc.cluster.local。因此，命名空间名称位于属于给定命名空间的每个服务的URI中。所以去为每个命名空间进行谨慎的命名是至关重要的。
- ResourceQuotas provide constraints that limit the aggregated resource consumption per namespace. With ResourceQuotas, a cluster administrator can control the number of objects per type that are allowed in a namespace. For example, a developer namespace may allow only five ConfigMaps, five Secrets, five Services,five ReplicaSets, five PersistentVolumeClaims, and ten Pods.
- 资源配额服务提供了对每个命名空间的聚合资源消耗的约束和限制。使用资源配额服务，群集管理员可以控制命名空间中每种资源类型的对象数。例如，开发人员命名空间可能只允许五个配置映射、五个敏感数据资源集、五个服务、五个副本集、五个PersistentVolumeClaims（持久化容量声明）和十个POD。
- ResourceQuotas can also limit the total sum of computing resources we can request in a given namespace. For example, in a cluster with a capacity of 32 GB RAM and 16 cores, it is possible to allocate half of the resources—16 GB RAM and 8 cores—for the production namespace, 8 GB RAM and 4 cores for staging environment, 4 GB RAM and 2 cores for development, and the same amount for testing namespaces. The ability of imposing resource constraints on a group of objects by using namespaces and ResourceQuotas is invaluable.
- 资源配额服务还可以限制给定命名空间中请求的计算资源总量。例如，在容量为32 GB RAM和16个内核的集群中，可以分配一半的资源，16 GB RAM和8个内核用于生产命名空间，8 GB RAM和4个内核用于暂存环境，4 GB RAM和2个内核用于开发，相同数量的资源用于测试命名空间。通过使用命名空间和资源配额对一组对象施加资源约束的能力是非常宝贵的。

### 1.3 Discussion

### 1.3 讨论

We’ve only briefly covered a few of the main Kubernetes concepts we use in this book.However, there are more primitives used by developers on a day-by-day basis. Forexample, if you create a containerized service, there are collections of Kubernetes objects you can use to reap all the benefits of Kubernetes. Keep in mind, these are only the objects used by application developers to integrate a containerized service into Kubernetes. There are also other concepts used by administrators to enable developers to manage the platform effectively. Figure 1-4 gives an overview of the multitude of Kubernetes resources that are useful for developers.

我们在本书中只简要介绍了Kubernetes的几个主要概念，但是，开发人员每天都在使用更多的原语。例如，如果您创建一个容器化服务，那么可以使用Kubernetes对象的集合来获取Kubernetes的所有属性内容。请记住，这些只是应用程序开发人员用于将容器化服务集成到Kubernetes中的对象。管理员还使用了其他概念，使开发人员能够有效地管理平台。图1-4概述了对开发人员有用的大量Kubernetes资源。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/2466332/1633507900803-fa299476-031f-42e5-b9ca-5a5dfb026048.png#clientId=u6d5596df-caa0-4&from=paste&height=1105&id=ua25c2e71&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1105&originWidth=1383&originalType=binary&ratio=1&size=154235&status=done&style=none&taskId=u2d341a15-b233-4702-8fed-9c834967ad6&width=1383)
Figure 1-4. Kubernetes concepts for developers

With time, these new primitives give birth to new ways of solving problems, and some of these repetitive solutions become patterns. Throughout this book, rather than describing a Kubernetes resource in detail, we will focus on Kubernetes aspects that are proven as patterns.

随着时间的推移，这些新的原语产生了解决问题的新方法，其中一些重复的解决方案成为模式。在本书中，我们将重点介绍被证明是模式的Kubernetes方面，而不是详细描述Kubernetes资源。
