package skkuchin.service.service;

import skkuchin.service.domain.AppUser;
import skkuchin.service.domain.Role;

import java.util.List;

public interface UserService {
    boolean checkUsername(String username);
    AppUser saveUser(AppUser user);
    void saveRole(Role role);
    Role getRole(String roleName);
    void addRoleToUser(String username, String roleName);
    AppUser getUser(String username);
    List<AppUser> getUsers();
}
