package com.generatera.operation.platform.model.params.dict;

import com.jianyue.lightning.boot.starter.generic.crud.service.annotations.ParamStrategy;
import lombok.Data;

@Data
@ParamStrategy("search")
public class SearchDictParam implements DictParam {

    private String fItemType;

    // 不需要id
    @Override
    public String getId() {
        return null;
    }
}
