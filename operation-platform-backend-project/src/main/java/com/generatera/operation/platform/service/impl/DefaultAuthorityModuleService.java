package com.generatera.operation.platform.service.impl;

import com.generatera.operation.platform.model.entity.AuthorityModuleEntity;
import com.generatera.operation.platform.model.params.authority.AuthorityParam;
import com.generatera.operation.platform.service.AuthorityModuleService;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.QueryConverter;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.DefaultJpaValidationSupportForQueryAdapter;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.QuerySupport;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.service.AbstractCrudService;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.lang.reflect.Type;

/**
 * @author FLJ
 * @date 2023/3/27
 * @time 17:47
 * @Description 默认的 authority module service
 */
public class DefaultAuthorityModuleService extends AbstractCrudService<AuthorityParam, AuthorityModuleEntity> implements AuthorityModuleService {

    {
        addQueryConverters();
    }


}

interface AuthorityOperationQueryConverter extends QueryConverter<AuthorityParam> {

}


class DefaultAppQueryHandler implements AuthorityOperationQueryConverter, DefaultJpaValidationSupportForQueryAdapter<AuthorityParam> {

    @Nullable
    public QuerySupport convert(AuthorityParam authorityParam) {
        return null;
    }

    @Nullable
    public QuerySupport convertForAny(@NotNull Object o) {
        return null;
    }

    @NotNull
    public Class<QuerySupport> getTargetClass() {
        return null;
    }

    public boolean support(@NotNull Object o) {
        return false;
    }

    @Nullable
    public QuerySupport selectByIdGroupHandle(@NotNull AuthorityParam authorityParam) {
        return null;
    }


    @Nullable
    public QuerySupport deleteByIdGroupHandle(@NotNull AuthorityParam authorityParam) {
        return null;
    }

    @NotNull
    public QuerySupport updateGroupHandle(@NotNull AuthorityParam authorityParam) {
        return null;
    }
}
