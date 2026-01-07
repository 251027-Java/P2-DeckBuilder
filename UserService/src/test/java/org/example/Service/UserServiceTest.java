package org.example.Service;

import java.util.List;
import java.util.Optional;

import org.example.Controller.UserDTO;
import org.example.Controller.UserWOIDDTO;
import org.example.Repository.IUserRepository;
import org.example.model.User;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private IUserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setup() {
        user = new User("ash", "pikachu123");
        user.setUserId(1L);
    }

    /* ---------------- GET ALL USERS ---------------- */

    @Test
    void getAllUsers_returnsUserDTOList() {
        when(userRepository.findAll()).thenReturn(List.of(user));

        List<UserDTO> result = userService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals("ash", result.get(0).username());
        verify(userRepository).findAll();
    }

    /* ---------------- GET BY USERNAME ---------------- */

    @Test
    void getByUsername_userExists_returnsDTO() {
        when(userRepository.findByUsername("ash"))
                .thenReturn(Optional.of(user));

        UserDTO result = userService.getByUsername("ash");

        assertNotNull(result);
        assertEquals("ash", result.username());
        verify(userRepository).findByUsername("ash");
    }

    @Test
    void getByUsername_userDoesNotExist_returnsNull() {
        when(userRepository.findByUsername("misty"))
                .thenReturn(Optional.empty());

        UserDTO result = userService.getByUsername("misty");

        assertNull(result);
    }

    /* ---------------- GET BY ID ---------------- */

    @Test
    void getById_userExists_returnsDTO() {
        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        UserDTO result = userService.getById(1L);

        assertNotNull(result);
        assertEquals(1L, result.id());
    }

    @Test
    void getById_userDoesNotExist_returnsNull() {
        when(userRepository.findById(99L))
                .thenReturn(Optional.empty());

        UserDTO result = userService.getById(99L);

        assertNull(result);
    }

    /* ---------------- CREATE USER ---------------- */

    @Test
    void createUser_savesAndReturnsDTO() {
        UserWOIDDTO dto = new UserWOIDDTO("brock", "onix456");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> {
                    User savedUser = invocation.getArgument(0);
                    savedUser.setUserId(2L);
                    return savedUser;
                });

        UserDTO result = userService.createUser(dto);

        assertNotNull(result);
        assertEquals("brock", result.username());
        assertEquals(2L, result.id());
        verify(userRepository).save(any(User.class));
    }

    /* ---------------- UPDATE PASSWORD ---------------- */

    @Test
    void updatePassword_userExists_updatesPassword() {
        UserDTO dto = new UserDTO(1L, "ash", "newpass");

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class)))
                .thenReturn(user);

        UserDTO result = userService.updatePassword(dto);

        assertEquals("newpass", result.password());
        verify(userRepository).save(user);
    }

    @Test
    void updatePassword_userNotFound_throwsException() {
        UserDTO dto = new UserDTO(99L, "ghost", "nopass");

        when(userRepository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class,
                () -> userService.updatePassword(dto));
    }

    /* ---------------- DELETE USER ---------------- */

    @Test
    void deleteUser_callsRepository() {
        doNothing().when(userRepository).deleteById(1L);

        userService.deleteUser(1L);

        verify(userRepository).deleteById(1L);
    }
}
