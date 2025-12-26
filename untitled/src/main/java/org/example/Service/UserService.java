package org.example.Service;

import org.example.Controller.UserDTO;
import org.example.Controller.UserWOIDDTO;
import org.example.Repository.IUserRepository;
import org.example.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers(){
        return userRepository.findAll().stream().map(this::UserToDTO).toList();
    }

    public UserDTO getByUsername(String username){
        Optional<User> user = userRepository.findByUsername(username);
        return user.isEmpty() ? null : UserToDTO(user.get());
    }

    public UserDTO getById(Long id){
        Optional<User> user = userRepository.findById(id);
        return user.isEmpty() ? null : UserToDTO(user.get());
    }

    public UserDTO createUser(UserWOIDDTO DTO){
        User user = new User(DTO.username(), DTO.password());
        return UserToDTO(userRepository.save(user));
    }

    public UserDTO updatePassword(UserDTO DTO){
        User user = userRepository.findById(DTO.id()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        user.setPassword(DTO.password());
        return UserToDTO(userRepository.save(user));
    }

    public void deleteUser(Long id){
         userRepository.deleteById(id);
    }

    private UserDTO UserToDTO(User user){
        return new UserDTO(user.getUserId(), user.getUsername(), user.getPassword());
    }
}
