package com.generatera.operation.platform.model.params.dict;

import lombok.Data;

/**
 * @author FLJ
 * @date 2023/3/28
 * @time 15:39
 * @Description 通用dict 参数
 */
@Data
public class GenericDictParam implements DictParam {

    private String id;

    private String itemType;

    private String itemValue;

    private String fidItemType;
}
