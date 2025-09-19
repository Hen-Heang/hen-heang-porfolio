// Blog posts data structure
export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    date: string
    readTime: string
    category: string
    tags: string[]
    image: string
    author: string
    featured: boolean
    slug: string
}

export const blogPosts: BlogPost[] = [
    {
        id: "java8-api-development",
        title: "Java 8 API Development: Modern Backend Development with Spring Boot",
        excerpt: "Master Java 8 features for building robust REST APIs with Spring Boot. Learn about Stream API, Lambda expressions, Optional, CompletableFuture, and best practices for enterprise-grade applications.",
        content: `# Java 8 API Development: Modern Backend Development with Spring Boot

Java 8 revolutionized the way we write Java code, introducing powerful features that make API development more efficient and expressive. In this comprehensive guide, we'll explore how to leverage Java 8 features in building modern REST APIs with Spring Boot.

## Why Java 8 for API Development?

Java 8 introduced several game-changing features that are essential for modern API development:

- **Lambda Expressions**: Enable functional programming and cleaner code
- **Stream API**: Powerful data processing capabilities
- **Optional**: Better null handling and safer code
- **CompletableFuture**: Asynchronous programming made easy
- **Method References**: Cleaner, more readable code
- **Date/Time API**: Modern date and time handling

## Setting Up a Java 8 Spring Boot Project

### 1. Project Dependencies

\`\`\`xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
</dependencies>
\`\`\`

### 2. Application Configuration

\`\`\`properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/api_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Server configuration
server.port=8080
server.servlet.context-path=/api

# Logging
logging.level.com.yourpackage=DEBUG
\`\`\`

## Building a User Management API with Java 8

### 1. Entity with Java 8 Features

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Constructors
    public User() {}
    
    public User(String name, String email, String password, UserRole role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    
    // Getters and setters...
    
    // Java 8 method for role checking
    public boolean isAdmin() {
        return Optional.ofNullable(role)
                .map(UserRole.ADMIN::equals)
                .orElse(false);
    }
    
    // Java 8 method for date formatting
    public String getFormattedCreatedDate() {
        return Optional.ofNullable(createdAt)
                .map(date -> date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .orElse("N/A");
    }
}
\`\`\`

### 2. Repository with Stream API

\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(UserRole role);
    
    @Query("SELECT u FROM User u WHERE u.createdAt >= :date")
    List<User> findUsersCreatedAfter(@Param("date") LocalDateTime date);
    
    // Custom method using Java 8 features
    default List<User> findActiveUsers() {
        return findAll().stream()
                .filter(user -> user.getRole() != null)
                .filter(user -> !user.getRole().equals(UserRole.INACTIVE))
                .collect(Collectors.toList());
    }
    
    // Method to get user statistics
    default Map<UserRole, Long> getUserStatistics() {
        return findAll().stream()
                .filter(user -> user.getRole() != null)
                .collect(Collectors.groupingBy(
                    User::getRole,
                    Collectors.counting()
                ));
    }
}
\`\`\`

### 3. Service Layer with Java 8 Features

\`\`\`java
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    // Create user with validation
    public CompletableFuture<User> createUser(CreateUserRequest request) {
        return CompletableFuture.supplyAsync(() -> {
            // Validate email uniqueness
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new UserAlreadyExistsException("Email already exists: " + request.getEmail());
            }
            
            // Create user
            User user = new User(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getRole()
            );
            
            return userRepository.save(user);
        });
    }
    
    // Get users with filtering and pagination
    public Page<User> getUsers(UserFilter filter, Pageable pageable) {
        return userRepository.findAll((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // Filter by role using Optional
            Optional.ofNullable(filter.getRole())
                    .ifPresent(role -> predicates.add(criteriaBuilder.equal(root.get("role"), role)));
            
            // Filter by name using Optional and like
            Optional.ofNullable(filter.getName())
                    .ifPresent(name -> predicates.add(
                        criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("name")),
                            "%" + name.toLowerCase() + "%"
                        )
                    ));
            
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }
    
    // Update user with Java 8 features
    public Optional<User> updateUser(Long id, UpdateUserRequest request) {
        return userRepository.findById(id)
                .map(user -> {
                    Optional.ofNullable(request.getName())
                            .ifPresent(user::setName);
                    Optional.ofNullable(request.getRole())
                            .ifPresent(user::setRole);
                    return userRepository.save(user);
                });
    }
    
    // Delete user with validation
    public boolean deleteUser(Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return true;
                })
                .orElse(false);
    }
    
    // Get user statistics using Stream API
    public UserStatistics getUserStatistics() {
        List<User> users = userRepository.findAll();
        
        return UserStatistics.builder()
                .totalUsers(users.size())
                .adminCount(users.stream()
                        .filter(User::isAdmin)
                        .count())
                .recentUsers(users.stream()
                        .filter(user -> user.getCreatedAt()
                                .isAfter(LocalDateTime.now().minusDays(30)))
                        .count())
                .roleDistribution(userRepository.getUserStatistics())
                .build();
    }
    
    // Process users asynchronously
    public CompletableFuture<List<User>> processUsersAsync(List<Long> userIds) {
        List<CompletableFuture<User>> futures = userIds.stream()
                .map(id -> CompletableFuture.supplyAsync(() -> 
                    userRepository.findById(id)
                            .orElseThrow(() -> new UserNotFoundException("User not found: " + id))
                ))
                .collect(Collectors.toList());
        
        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(v -> futures.stream()
                        .map(CompletableFuture::join)
                        .collect(Collectors.toList()));
    }
}
\`\`\`

### 4. Controller with Modern Java 8 Patterns

\`\`\`java
@RestController
@RequestMapping("/users")
@Validated
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    // Create user endpoint
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        return userService.createUser(request)
                .thenApply(user -> ResponseEntity.status(HttpStatus.CREATED)
                        .body(UserResponse.from(user)))
                .exceptionally(throwable -> {
                    if (throwable.getCause() instanceof UserAlreadyExistsException) {
                        return ResponseEntity.status(HttpStatus.CONFLICT).build();
                    }
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                })
                .join();
    }
    
    // Get users with filtering
    @GetMapping
    public ResponseEntity<Page<UserResponse>> getUsers(
            @RequestParam(required = false) UserRole role,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        
        UserFilter filter = UserFilter.builder()
                .role(role)
                .name(name)
                .build();
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<User> users = userService.getUsers(filter, pageable);
        
        Page<UserResponse> response = users.map(UserResponse::from);
        return ResponseEntity.ok(response);
    }
    
    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(UserResponse.from(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        
        return userService.updateUser(id, request)
                .map(user -> ResponseEntity.ok(UserResponse.from(user)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    // Get user statistics
    @GetMapping("/statistics")
    public ResponseEntity<UserStatistics> getUserStatistics() {
        UserStatistics statistics = userService.getUserStatistics();
        return ResponseEntity.ok(statistics);
    }
    
    // Bulk operations
    @PostMapping("/bulk")
    public ResponseEntity<List<UserResponse>> processUsersBulk(@RequestBody List<Long> userIds) {
        return userService.processUsersAsync(userIds)
                .thenApply(users -> users.stream()
                        .map(UserResponse::from)
                        .collect(Collectors.toList()))
                .thenApply(ResponseEntity::ok)
                .exceptionally(throwable -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build())
                .join();
    }
}
\`\`\`

### 5. DTOs with Java 8 Features

\`\`\`java
// Request DTOs
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {
    @NotBlank(message = "Name is required")
    private String name;
    
    @Email(message = "Email must be valid")
    @NotBlank(message = "Email is required")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
    
    @NotNull(message = "Role is required")
    private UserRole role;
}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {
    private String name;
    private UserRole role;
}

// Response DTOs
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private UserRole role;
    private String createdAt;
    private String updatedAt;
    
    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getFormattedCreatedDate())
                .updatedAt(Optional.ofNullable(user.getUpdatedAt())
                        .map(date -> date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                        .orElse("N/A"))
                .build();
    }
}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStatistics {
    private long totalUsers;
    private long adminCount;
    private long recentUsers;
    private Map<UserRole, Long> roleDistribution;
}
\`\`\`

## Java 8 Best Practices for API Development

### 1. Use Optional for Null Safety

\`\`\`java
// Good: Using Optional
public Optional<User> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
}

// Usage
userService.findUserByEmail("user@example.com")
    .ifPresent(user -> log.info("User found: {}", user.getName()));

// Bad: Returning null
public User findUserByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
}
\`\`\`

### 2. Leverage Stream API for Data Processing

\`\`\`java
// Process collections efficiently
public List<UserResponse> getActiveUsers() {
    return userRepository.findAll().stream()
            .filter(user -> user.getRole() != UserRole.INACTIVE)
            .map(UserResponse::from)
            .collect(Collectors.toList());
}

// Group and aggregate data
public Map<UserRole, List<User>> groupUsersByRole() {
    return userRepository.findAll().stream()
            .collect(Collectors.groupingBy(User::getRole));
}
\`\`\`

### 3. Use CompletableFuture for Async Operations

\`\`\`java
// Async operations
public CompletableFuture<List<User>> getUsersAsync() {
    return CompletableFuture.supplyAsync(() -> userRepository.findAll());
}

// Combine multiple async operations
public CompletableFuture<UserStatistics> getStatisticsAsync() {
    CompletableFuture<List<User>> usersFuture = getUsersAsync();
    CompletableFuture<Long> countFuture = CompletableFuture.supplyAsync(() -> userRepository.count());
    
    return usersFuture.thenCombine(countFuture, (users, count) -> 
        UserStatistics.builder()
                .totalUsers(count)
                .adminCount(users.stream().filter(User::isAdmin).count())
                .build()
    );
}
\`\`\`

### 4. Exception Handling with Java 8

\`\`\`java
// Custom exception handling
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.toList());
        
        ErrorResponse error = ErrorResponse.builder()
                .message("Validation failed")
                .errors(errors)
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .build();
        
        return ResponseEntity.badRequest().body(error);
    }
}
\`\`\`

## Performance Optimization with Java 8

### 1. Parallel Streams for Large Datasets

\`\`\`java
// Use parallel streams for CPU-intensive operations
public List<UserResponse> processLargeUserList(List<User> users) {
    return users.parallelStream()
            .filter(user -> user.getRole() != UserRole.INACTIVE)
            .map(UserResponse::from)
            .collect(Collectors.toList());
}
\`\`\`

### 2. Caching with Java 8

\`\`\`java
@Service
public class CachedUserService {
    
    private final Map<String, User> userCache = new ConcurrentHashMap<>();
    
    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userCache.computeIfAbsent(email, 
            key -> userRepository.findByEmail(key).orElse(null)));
    }
}
\`\`\`

## Testing Java 8 APIs

### 1. Unit Testing with Java 8

\`\`\`java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void shouldCreateUserSuccessfully() {
        // Given
        CreateUserRequest request = CreateUserRequest.builder()
                .name("John Doe")
                .email("john@example.com")
                .password("password123")
                .role(UserRole.USER)
                .build();
        
        User savedUser = new User("John Doe", "john@example.com", "encoded", UserRole.USER);
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        
        // When
        CompletableFuture<User> result = userService.createUser(request);
        
        // Then
        assertThat(result.join()).isEqualTo(savedUser);
    }
    
    @Test
    void shouldReturnEmptyWhenUserNotFound() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        
        // When
        Optional<User> result = userService.getUserById(1L);
        
        // Then
        assertThat(result).isEmpty();
    }
}
\`\`\`

## Conclusion

Java 8 features have transformed the way we build APIs, making code more readable, maintainable, and efficient. By leveraging:

- **Lambda expressions** for cleaner, more functional code
- **Stream API** for powerful data processing
- **Optional** for null safety
- **CompletableFuture** for asynchronous operations
- **Method references** for better readability

You can build robust, scalable REST APIs that are both performant and maintainable. These features, combined with Spring Boot's powerful ecosystem, provide a solid foundation for enterprise-grade API development.

Remember to always consider performance implications, especially when using parallel streams and async operations, and ensure proper error handling and validation throughout your API.`,
        date: "2024-01-15",
        readTime: "15 min",
        category: "Backend Development",
        tags: ["Java 8", "Spring Boot", "REST API", "Lambda Expressions", "Stream API", "Optional", "CompletableFuture"],
        image: "/image/java8-api-development.svg",
        author: "Hen Heang",
        featured: true,
        slug: "java8-api-development"
    },
    {
        id: "1",
        title: "Getting Started with Java Programming",
        excerpt: "Learn the fundamentals of Java programming language, from basic syntax to object-oriented concepts. Perfect for beginners who want to start their Java journey.",
        content: `# Getting Started with Java Programming

Java is one of the most popular programming languages in the world. In this comprehensive guide, we'll cover the basics of Java programming.

## What is Java?

Java is a high-level, object-oriented programming language that was developed by Sun Microsystems (now owned by Oracle) in 1995. It's designed to be platform-independent, meaning Java code can run on any device that has a Java Virtual Machine (JVM).

## Key Features of Java

- **Platform Independent**: Write once, run anywhere
- **Object-Oriented**: Everything in Java is an object
- **Secure**: Built-in security features
- **Multithreaded**: Supports concurrent programming
- **High Performance**: Just-in-time compilation

## Setting Up Java Development Environment

### 1. Install Java Development Kit (JDK)

Download and install the latest JDK from Oracle's website or use OpenJDK.

### 2. Set Up IDE

Popular Java IDEs include:
- IntelliJ IDEA
- Eclipse
- Visual Studio Code with Java extensions

### 3. Your First Java Program

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Basic Java Syntax

### Variables and Data Types

\`\`\`java
// Primitive data types
int age = 25;
double salary = 50000.50;
char grade = 'A';
boolean isActive = true;

// Reference data types
String name = "John Doe";
\`\`\`

### Control Structures

\`\`\`java
// If-else statement
if (age >= 18) {
    System.out.println("You are an adult");
} else {
    System.out.println("You are a minor");
}

// For loop
for (int i = 0; i < 5; i++) {
    System.out.println("Count: " + i);
}
\`\`\`

## Object-Oriented Programming in Java

### Classes and Objects

\`\`\`java
public class Car {
    // Fields (attributes)
    private String brand;
    private String model;
    private int year;
    
    // Constructor
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    
    // Methods
    public void start() {
        System.out.println("The " + brand + " " + model + " is starting...");
    }
    
    public String getBrand() {
        return brand;
    }
}
\`\`\`

## Next Steps

Now that you understand the basics of Java, you can:
1. Practice with more complex programs
2. Learn about Java collections
3. Explore exception handling
4. Dive into multithreading

## Conclusion

Java is a powerful and versatile programming language. With its strong typing system and object-oriented approach, it's an excellent choice for building enterprise applications, Android apps, and web services.

Happy coding!`,
        date: "2024-01-20",
        readTime: "8 min read",
        category: "Java Basics",
        tags: ["Java", "Programming", "Beginner", "OOP"],
        image: "/image/java-basics.svg",
        author: "Hen Heang",
        featured: true,
        slug: "getting-started-with-java-programming"
    },
    {
        id: "2",
        title: "Spring Boot Fundamentals: Building Your First REST API",
        excerpt: "Master the basics of Spring Boot framework and learn how to create a robust REST API with proper error handling and data validation.",
        content: `
# Spring Boot Fundamentals: Building Your First REST API

Spring Boot is a powerful framework that simplifies the development of Spring-based applications. In this tutorial, we'll build a complete REST API from scratch.

## What is Spring Boot?

Spring Boot is an extension of the Spring framework that eliminates the boilerplate configuration required to set up a Spring application. It provides:

- **Auto-configuration**: Automatically configures your application
- **Embedded servers**: No need for external servlet containers
- **Production-ready features**: Health checks, metrics, and more
- **Opinionated defaults**: Sensible defaults for rapid development

## Setting Up a Spring Boot Project

### 1. Create a New Project

Use Spring Initializr (https://start.spring.io/) or your IDE to create a new Spring Boot project with these dependencies:

- Spring Web
- Spring Data JPA
- H2 Database (for development)
- Spring Boot DevTools

### 2. Project Structure

\`\`\`
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── example/
│   │           └── demo/
│   │               ├── DemoApplication.java
│   │               ├── controller/
│   │               ├── model/
│   │               ├── repository/
│   │               └── service/
│   └── resources/
│       ├── application.properties
│       └── static/
└── test/
\`\`\`

## Building a User Management API

### 1. Create the User Entity

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    // Constructors, getters, and setters
    public User() {}
    
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    
    // Getters and setters...
}
\`\`\`

### 2. Create the Repository

\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
\`\`\`

### 3. Create the Service Layer

\`\`\`java
@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
\`\`\`

### 4. Create the REST Controller

\`\`\`java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
\`\`\`

## Adding Validation

### 1. Add Validation Dependencies

Add to your \`pom.xml\`:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
\`\`\`

### 2. Update the User Entity

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    // ... rest of the code
}
\`\`\`

### 3. Update the Controller

\`\`\`java
@PostMapping
public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
    try {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().build();
    }
}
\`\`\`

## Testing Your API

### Using cURL

\`\`\`bash
# Create a user
curl -X POST http://localhost:8080/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Get all users
curl http://localhost:8080/api/users

# Get user by ID
curl http://localhost:8080/api/users/1
\`\`\`

## Best Practices

1. **Use DTOs**: Create Data Transfer Objects for API requests/responses
2. **Implement proper error handling**: Use @ControllerAdvice for global exception handling
3. **Add logging**: Use SLF4J for logging
4. **Write tests**: Unit tests and integration tests
5. **Use profiles**: Different configurations for different environments

## Conclusion

Spring Boot makes it incredibly easy to build robust REST APIs. With its auto-configuration and opinionated defaults, you can focus on business logic rather than boilerplate code.

In the next tutorial, we'll cover advanced topics like security, caching, and deployment.

Happy coding!
        `,
        date: "2024-01-18",
        readTime: "12 min read",
        category: "Spring Boot",
        tags: ["Spring Boot", "REST API", "Java", "Backend"],
        image: "/image/spring-boot-fundamentals.svg",
        author: "Hen Heang",
        featured: true,
        slug: "spring-boot-fundamentals-rest-api"
    },
    {
        id: "3",
        title: "Java Collections Framework: Complete Guide",
        excerpt: "Master the Java Collections Framework with practical examples. Learn about List, Set, Map, and their implementations with real-world use cases.",
        content: `
# Java Collections Framework: Complete Guide

The Java Collections Framework provides a unified architecture for representing and manipulating collections. In this comprehensive guide, we'll explore all the major collection types and their use cases.

## What is the Collections Framework?

The Collections Framework is a unified architecture for representing and manipulating collections. It includes:

- **Interfaces**: Define the contract for collection types
- **Implementations**: Concrete classes that implement the interfaces
- **Algorithms**: Methods that perform useful computations on collections

## Core Collection Interfaces

### 1. Collection Interface

The root interface in the collection hierarchy.

\`\`\`java
public interface Collection<E> extends Iterable<E> {
    // Basic operations
    int size();
    boolean isEmpty();
    boolean contains(Object element);
    boolean add(E element);
    boolean remove(Object element);
    Iterator<E> iterator();
    
    // Bulk operations
    boolean containsAll(Collection<?> c);
    boolean addAll(Collection<? extends E> c);
    boolean removeAll(Collection<?> c);
    boolean retainAll(Collection<?> c);
    void clear();
    
    // Array operations
    Object[] toArray();
    <T> T[] toArray(T[] a);
}
\`\`\`

## List Interface

Lists are ordered collections that allow duplicate elements.

### ArrayList

\`\`\`java
import java.util.*;

public class ArrayListExample {
    public static void main(String[] args) {
        // Creating an ArrayList
        List<String> fruits = new ArrayList<>();
        
        // Adding elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        
        // Accessing elements
        System.out.println("First fruit: " + fruits.get(0));
        
        // Iterating through the list
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
        
        // Using streams
        fruits.stream()
              .filter(f -> f.startsWith("A"))
              .forEach(System.out::println);
    }
}
\`\`\`

### LinkedList

\`\`\`java
public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<Integer> numbers = new LinkedList<>();
        
        // Adding elements
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        
        // Adding at specific positions
        numbers.addFirst(0);
        numbers.addLast(4);
        
        // Removing elements
        numbers.removeFirst();
        numbers.removeLast();
        
        System.out.println("Numbers: " + numbers);
    }
}
\`\`\`

## Set Interface

Sets are collections that do not allow duplicate elements.

### HashSet

\`\`\`java
public class HashSetExample {
    public static void main(String[] args) {
        Set<String> uniqueNames = new HashSet<>();
        
        // Adding elements
        uniqueNames.add("John");
        uniqueNames.add("Jane");
        uniqueNames.add("John"); // Duplicate - won't be added
        
        System.out.println("Size: " + uniqueNames.size()); // Output: 2
        
        // Checking if element exists
        if (uniqueNames.contains("John")) {
            System.out.println("John is in the set");
        }
    }
}
\`\`\`

### TreeSet

\`\`\`java
public class TreeSetExample {
    public static void main(String[] args) {
        TreeSet<Integer> sortedNumbers = new TreeSet<>();
        
        sortedNumbers.add(5);
        sortedNumbers.add(2);
        sortedNumbers.add(8);
        sortedNumbers.add(1);
        
        System.out.println("Sorted numbers: " + sortedNumbers);
        // Output: [1, 2, 5, 8]
        
        // Getting first and last elements
        System.out.println("First: " + sortedNumbers.first());
        System.out.println("Last: " + sortedNumbers.last());
    }
}
\`\`\`

## Map Interface

Maps store key-value pairs and do not allow duplicate keys.

### HashMap

\`\`\`java
public class HashMapExample {
    public static void main(String[] args) {
        Map<String, Integer> ageMap = new HashMap<>();
        
        // Adding key-value pairs
        ageMap.put("John", 25);
        ageMap.put("Jane", 30);
        ageMap.put("Bob", 35);
        
        // Getting values
        System.out.println("John's age: " + ageMap.get("John"));
        
        // Checking if key exists
        if (ageMap.containsKey("John")) {
            System.out.println("John is in the map");
        }
        
        // Iterating through the map
        for (Map.Entry<String, Integer> entry : ageMap.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Using forEach with lambda
        ageMap.forEach((name, age) -> 
            System.out.println(name + " is " + age + " years old"));
    }
}
\`\`\`

### TreeMap

\`\`\`java
public class TreeMapExample {
    public static void main(String[] args) {
        TreeMap<String, String> sortedMap = new TreeMap<>();
        
        sortedMap.put("Zebra", "Animal");
        sortedMap.put("Apple", "Fruit");
        sortedMap.put("Book", "Object");
        
        System.out.println("Sorted map: " + sortedMap);
        // Output: {Apple=Fruit, Book=Object, Zebra=Animal}
    }
}
\`\`\`

## Queue Interface

Queues are collections designed for holding elements prior to processing.

### PriorityQueue

\`\`\`java
public class PriorityQueueExample {
    public static void main(String[] args) {
        PriorityQueue<Integer> priorityQueue = new PriorityQueue<>();
        
        // Adding elements
        priorityQueue.offer(5);
        priorityQueue.offer(2);
        priorityQueue.offer(8);
        priorityQueue.offer(1);
        
        // Processing elements (in priority order)
        while (!priorityQueue.isEmpty()) {
            System.out.println(priorityQueue.poll());
        }
        // Output: 1, 2, 5, 8
    }
}
\`\`\`

## Practical Examples

### 1. Finding Duplicates in a List

\`\`\`java
public class FindDuplicates {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("A", "B", "C", "A", "B", "D");
        
        // Using Set to find duplicates
        Set<String> uniqueElements = new HashSet<>();
        Set<String> duplicates = new HashSet<>();
        
        for (String element : list) {
            if (!uniqueElements.add(element)) {
                duplicates.add(element);
            }
        }
        
        System.out.println("Duplicates: " + duplicates);
    }
}
\`\`\`

### 2. Grouping Elements

\`\`\`java
public class GroupingExample {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "apricot", "cherry", "avocado");
        
        // Group by first letter
        Map<Character, List<String>> grouped = words.stream()
            .collect(Collectors.groupingBy(word -> word.charAt(0)));
        
        System.out.println(grouped);
        // Output: {a=[apple, apricot, avocado], b=[banana], c=[cherry]}
    }
}
\`\`\`

### 3. Sorting Collections

\`\`\`java
public class SortingExample {
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("John", 25),
            new Person("Jane", 30),
            new Person("Bob", 20)
        );
        
        // Sort by age
        people.sort(Comparator.comparing(Person::getAge));
        
        // Sort by name
        people.sort(Comparator.comparing(Person::getName));
        
        // Reverse sort
        people.sort(Comparator.comparing(Person::getAge).reversed());
    }
}

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getters and setters...
}
\`\`\`

## Performance Considerations

| Collection | Access | Search | Insertion | Deletion |
|------------|--------|--------|-----------|----------|
| ArrayList | O(1) | O(n) | O(n) | O(n) |
| LinkedList | O(n) | O(n) | O(1) | O(1) |
| HashSet | N/A | O(1) | O(1) | O(1) |
| TreeSet | N/A | O(log n) | O(log n) | O(log n) |
| HashMap | N/A | O(1) | O(1) | O(1) |
| TreeMap | N/A | O(log n) | O(log n) | O(log n) |

## Best Practices

1. **Choose the right collection**: Consider your use case and performance requirements
2. **Use generics**: Always specify the type parameter
3. **Prefer interfaces**: Use List instead of ArrayList when declaring variables
4. **Use streams**: For functional programming operations
5. **Consider thread safety**: Use ConcurrentHashMap for concurrent access

## Conclusion

The Java Collections Framework is a powerful tool that every Java developer should master. Understanding when to use each collection type and their performance characteristics is crucial for writing efficient Java applications.

Practice with these examples and experiment with different scenarios to deepen your understanding.

Happy coding!
        `,
        date: "2024-01-15",
        readTime: "15 min read",
        category: "Java Advanced",
        tags: ["Java", "Collections", "Data Structures", "Performance"],
        image: "/image/placeholder_image.png",
        author: "Hen Heang",
        featured: false,
        slug: "java-collections-framework-complete-guide"
    },
    {
        id: "4",
        title: "Spring Security: Authentication and Authorization",
        excerpt: "Learn how to implement security in your Spring Boot applications. Cover JWT authentication, role-based access control, and best practices.",
        content: `
# Spring Security: Authentication and Authorization

Security is a critical aspect of any web application. Spring Security provides comprehensive security services for Java applications. In this tutorial, we'll implement authentication and authorization in a Spring Boot application.

## What is Spring Security?

Spring Security is a powerful and highly customizable authentication and access-control framework. It provides:

- **Authentication**: Verifying who a user is
- **Authorization**: Determining what a user can do
- **Protection against common attacks**: CSRF, session fixation, etc.
- **Integration with various authentication providers**

## Setting Up Spring Security

### 1. Add Dependencies

Add to your \`pom.xml\`:

\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
\`\`\`

### 2. Basic Security Configuration

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
\`\`\`

## JWT Token Implementation

### 1. JWT Utility Class

\`\`\`java
@Component
public class JwtUtil {
    
    private String secret = "mySecretKey";
    private int jwtExpiration = 86400000; // 24 hours
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
    
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
\`\`\`

### 2. JWT Authentication Filter

\`\`\`java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        final String authorizationHeader = request.getHeader("Authorization");
        
        String username = null;
        String jwt = null;
        
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
\`\`\`

## User Management

### 1. User Entity with Roles

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role;
    
    // Constructors, getters, and setters
}

public enum Role {
    USER, ADMIN, MODERATOR
}
\`\`\`

### 2. User Repository

\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
\`\`\`

### 3. User Service

\`\`\`java
@Service
@Transactional
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        
        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(getAuthorities(user.getRole()))
                .build();
    }
    
    private Collection<? extends GrantedAuthority> getAuthorities(Role role) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        
        return userRepository.save(user);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
\`\`\`

## Authentication Controller

\`\`\`java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = new User();
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            
            User savedUser = userService.registerUser(user);
            
            return ResponseEntity.ok(new AuthResponse(
                jwtUtil.generateToken(userService.loadUserByUsername(savedUser.getUsername())),
                "User registered successfully"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );
            
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);
            
            return ResponseEntity.ok(new AuthResponse(token, "Login successful"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid credentials"));
        }
    }
}
\`\`\`

## Role-Based Access Control

### 1. Method-Level Security

\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        User user = userService.findByUsername(authentication.getName());
        return ResponseEntity.ok(user);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
\`\`\`

### 2. Enable Method Security

\`\`\`java
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class MethodSecurityConfig {
    // Configuration for method-level security
}
\`\`\`

## Testing Security

### 1. Test Authentication

\`\`\`java
@SpringBootTest
@AutoConfigureTestDatabase
class AuthControllerTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void testUserRegistration() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("testuser");
        request.setEmail("test@example.com");
        request.setPassword("password123");
        
        ResponseEntity<AuthResponse> response = restTemplate.postForEntity(
            "/api/auth/register", request, AuthResponse.class);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().getToken());
    }
    
    @Test
    void testUserLogin() {
        LoginRequest request = new LoginRequest();
        request.setUsername("testuser");
        request.setPassword("password123");
        
        ResponseEntity<AuthResponse> response = restTemplate.postForEntity(
            "/api/auth/login", request, AuthResponse.class);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().getToken());
    }
}
\`\`\`

## Best Practices

1. **Use HTTPS**: Always use HTTPS in production
2. **Secure password storage**: Use BCrypt or similar
3. **Token expiration**: Set reasonable token expiration times
4. **Input validation**: Validate all user inputs
5. **Rate limiting**: Implement rate limiting for authentication endpoints
6. **Logging**: Log security events for monitoring

## Conclusion

Spring Security provides a robust framework for implementing authentication and authorization in your Spring Boot applications. With JWT tokens and role-based access control, you can build secure APIs that protect your users' data.

Remember to always follow security best practices and keep your dependencies updated.

Happy coding!
        `,
        date: "2024-01-12",
        readTime: "18 min read",
        category: "Spring Security",
        tags: ["Spring Security", "JWT", "Authentication", "Authorization"],
        image: "/image/placeholder_image.png",
        author: "Hen Heang",
        featured: true,
        slug: "spring-security-authentication-authorization"
    }
]

// Helper function to get featured posts
export const getFeaturedPosts = (): BlogPost[] => {
    return blogPosts.filter(post => post.featured)
}

// Helper function to get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
    return blogPosts.filter(post => post.category === category)
}

// Helper function to get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug)
}
