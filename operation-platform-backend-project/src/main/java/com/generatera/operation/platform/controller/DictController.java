package com.generatera.operation.platform.controller;

import com.generatera.operation.platform.model.params.dict.DictParam;
import com.generatera.operation.platform.service.DictService;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.controller.AbstractGenericController;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/v1/dict")
public class DictController extends AbstractGenericController<DictParam, DictService> {
    public DictController(@NotNull DictService service) {
        super(service);
    }
}
