package com.generatera.operation.platform.controller;

import com.generatera.operation.platform.model.params.app.AppParam;
import com.generatera.operation.platform.service.AppService;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.controller.AbstractGenericController;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author FLJ
 * @date 2023/3/28
 * @time 10:33
 * @Description app controller
 */
@RestController
@RequestMapping("/api/admin/app/v1")
public class AppController extends AbstractGenericController<AppParam, AppService> {

    @Autowired
    public AppController(@NotNull AppService service) {
        super(service);
    }
}
