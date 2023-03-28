package com.generatera.operation.platform.service.impl;

import com.generatera.operation.platform.model.entity.DictEntity;
import com.generatera.operation.platform.model.params.app.GenericAppParam;
import com.generatera.operation.platform.model.params.dict.DictParam;
import com.generatera.operation.platform.model.params.dict.GenericDictParam;
import com.generatera.operation.platform.model.params.dict.SearchDictParam;
import com.generatera.operation.platform.service.DictService;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.QueryConverter;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.converters.strategy.DefaultStrategySupportForQueryAdapter;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.QuerySupport;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.DefaultJpaQuery;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.JpaQueryInfo;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.query.jpa.JpaSpecificationQuery;
import com.jianyue.lightning.boot.starter.generic.crud.service.support.service.AbstractCrudService;
import com.jianyue.lightning.boot.starter.util.EscapeUtil;
import com.jianyue.lightning.boot.starter.util.OptionalFlux;
import com.jianyue.lightning.boot.starter.util.lambda.LambdaUtils;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.lang.reflect.Type;

@Service
public class DefaultDictService extends AbstractCrudService<DictParam, DictEntity> implements DictService {
    {
        addQueryConverters(new DictQueryHandler(),new SearchQueryHandler());
    }
}

class DictQueryHandler implements DefaultStrategySupportForQueryAdapter<DictParam> {

    @Override
    public Type getSourceClass() {
        return GenericAppParam.class;
    }

    @Override
    public QuerySupport addGroupHandle(DictParam dictParam) {
        // 名字 / itemType 不能重复
        return OptionalFlux.of(dictParam)
                .cast(GenericDictParam.class)
                .map(AddGroupSpecification::new)
                .map(ele -> new JpaSpecificationQuery<>(new JpaQueryInfo<>(ele)))
                .getResult();
    }

    @AllArgsConstructor
    static class AddGroupSpecification implements Specification<DictEntity> {
        private GenericDictParam param;

        @Override
        public Predicate toPredicate(@NotNull Root<DictEntity> root, @NotNull CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
            return OptionalFlux.string(param.getItemValue())
                    .map(ele -> criteriaBuilder.equal(root.get(LambdaUtils.getPropertyNameForLambda(DictEntity::getItemValue)), ele))
                    .combine(
                            OptionalFlux.string(
                                            param.getItemType()
                                    )
                                    .map(ele -> criteriaBuilder.equal(root.get(LambdaUtils.getPropertyNameForLambda(DictEntity::getItemType)), ele)),
                            criteriaBuilder::or
                    )
                    .getResult();
        }
    }

    @Override
    public QuerySupport selectListGroupHandle(DictParam dictParam) {
        GenericDictParam param = (GenericDictParam) dictParam;

        // 根据名称进行模糊查询 ...
        return new JpaSpecificationQuery<>(
                new JpaQueryInfo<>(
                        (root, query, criteriaBuilder) ->
                                criteriaBuilder.like(root.get(LambdaUtils.getPropertyNameForLambda(DictEntity::getItemValue)),
                                        '%' + EscapeUtil.escapeExprSpecialWord(param.getItemValue()) + '%')
                )
        );
    }
}

class SearchQueryHandler implements QueryConverter<DictParam> {

    @Override
    public QuerySupport convert(DictParam dictParam) {
        SearchDictParam param = (SearchDictParam) dictParam;
        return new DefaultJpaQuery(
                new JpaQueryInfo<>(
                        DictEntity.builder()
                                .fidItemType(param.getFItemType())
                                .build()
                )
        );
    }

    @Override
    public Type getSourceClass() {
        return SearchDictParam.class;
    }
}
