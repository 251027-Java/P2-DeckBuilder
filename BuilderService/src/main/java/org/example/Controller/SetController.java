package org.example.Controller;

import java.util.List;

import org.example.Service.SetService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/set")
public class SetController {
    private final SetService service;

    public SetController(SetService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public SetDTO getById(@PathVariable String id) {
        return service.getById(id);
    }

    @GetMapping("/search")
    public SetDTO getByName(@RequestParam String name) {
        return service.getByName(name);
    }

    @GetMapping
    public List<SetDTO> getAllSets() {
        return service.getAllSets();
    }
}
