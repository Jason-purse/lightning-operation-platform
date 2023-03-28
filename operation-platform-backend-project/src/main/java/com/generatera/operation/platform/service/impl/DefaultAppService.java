package com.generatera.operation.platform.service.impl;

import com.generatera.operation.platform.model.entity.AppEntity;
import com.generatera.operation.platform.model.params.app.AppParam;
import com.generatera.operation.platform.model.params.app.GenericAppParam;
import com.generatera.operation.platform.service.AppService;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.DefaultStrategySupportForQueryAdapter;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.QuerySupport;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.DefaultJpaQuery;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.JpaQueryInfo;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.JpaSpecificationQuery;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.service.AbstractCrudService;
import com.jianyue.lightning.boot.starter.util.OptionalFlux;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.lang.reflect.Type;

@Service
public class DefaultAppService extends AbstractCrudService<AppParam, AppEntity> implements AppService {
    {
        addQueryConverters(new GenericQueryHandler());
    }
}


class GenericQueryHandler implements DefaultStrategySupportForQueryAdapter<AppParam> {

    @Override
    public Type getSourceClass() {
        return GenericAppParam.class;
    }

    @Override
    public QuerySupport addGroupHandle(AppParam appParam) {
        // 保证 appName 必须唯一
        return OptionalFlux.of(appParam)
                .cast(GenericAppParam.class)
                .map(GenericAppParam::getAppName)
                .switchMapIfTrueOrNull(
                        StringUtils::hasText,
                        appName -> {
                            return new DefaultJpaQuery(new JpaQueryInfo<>(AppEntity.builder().appName(appName).build()));
                        }
                )
                .getResult();
    }

    @Override
    public QuerySupport selectListGroupHandle(AppParam appParam) {

        // 查询列表时, 考虑appName  以及  应用类型 以及 应用描述
        return OptionalFlux.of(appParam)
                .cast(GenericAppParam.class)
                .map(SelectListSpecification::new)
                .map(ele -> new JpaSpecificationQuery<>(new JpaQueryInfo<>(ele)))
                .getResult();
    }

    @AllArgsConstructor
    static class SelectListSpecification implements Specification<AppEntity> {
        private final GenericAppParam param;
        @Override
        public Predicate toPredicate(@NotNull Root<AppEntity> root, @NotNull CriteriaQuery<?> query, @NotNull CriteriaBuilder criteriaBuilder) {
            return null;
        }
    }
}
