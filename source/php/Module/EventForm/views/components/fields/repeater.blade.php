<div class="js-repeater">
    <div class="sub-fields">
        @foreach($field['fields'] as $subField)
            <div @if(!empty($subField['condition']))data-condition="{{ json_encode($subField['condition'] ?? []) }}"@endif>
                @includeFirst(
                    [
                        'components.fields.' . $subField['type'] ?? '',
                        'components.fields._error'
                    ],
                    [
                        'field' => $subField
                    ]
                )
            </div>
        @endforeach
    </div>
    @button([
        'text' => $field['labels']['addButton'],
        'color' => 'primary',
        'style' => 'filled',
        'classList' => ['btn-repeater-add']
    ])
    @endbutton
    @button([
        'text' => $field['labels']['removeButton'],
        'color' => 'default',
        'style' => 'filled',
        'classList' => ['btn-repeater-remove', 'u-display--none']
    ])
    @endbutton
</div>
