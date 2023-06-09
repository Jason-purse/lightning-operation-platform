package com.generatera.operation.platform.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseVo {

    private String createTimeStr;

    private String createAt;

    private String updateTimeStr;

    private String updateAt;
}
