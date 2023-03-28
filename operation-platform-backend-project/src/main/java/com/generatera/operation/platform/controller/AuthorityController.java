package com.generatera.operation.platform.controller;

import com.generatera.operation.platform.model.params.authority.AuthorityParam;
import com.generatera.operation.platform.service.AuthorityModuleService;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.controller.AbstractGenericController;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/authority/v1")
public class AuthorityController extends AbstractGenericController<AuthorityParam, AuthorityModuleService> {

    public AuthorityController(@NotNull AuthorityModuleService service) {
        super(service);
    }

}