package org.example.Controller;

import org.example.Service.UserService;
import org.example.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")

public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }
    @GetMapping
    public List<UserDTO> getAllUsers(){
        return service.getAllUsers();
    }

    @GetMapping("/search")
    public UserDTO getByUsername(@RequestParam String username){
        return service.getByUsername(username);
    }

    @GetMapping("/{id}")
    public UserDTO getById(@PathVariable Long id){
        return service.getById(id);
    }

    @PostMapping
    public UserDTO createUser(@RequestBody UserWOIDDTO DTO){
        return service.createUser(DTO);
    }

    // TODO: put or patch (partial update)?
    @PutMapping("/{id}")
    public UserDTO updatePassword(@RequestBody UserDTO DTO){
        return service.updatePassword(DTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        service.deleteUser(id);
    }



}
